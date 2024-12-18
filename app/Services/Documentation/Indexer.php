<?php

namespace App\Services\Documentation;

use Algolia\AlgoliaSearch\SearchClient;
use App\CustomParser;
use App\Documentation;
use Illuminate\Contracts\Config\Repository as Config;
use Illuminate\Filesystem\Filesystem;
use ParsedownExtra;

class Indexer
{
    /**
     * The name of the index.
     *
     * @var string
     */
    protected static $index_name = 'docs';

    /**
     * The Algolia Index instance.
     *
     * @var \Algolia\AlgoliaSearch\SearchIndex
     */
    protected $index;

    /**
     * The Algolia client instance.
     *
     * @var \Algolia\AlgoliaSearch\SearchClient
     */
    protected $client;

    /**
     * The Parsedown parser instance.
     *
     * @var ParsedownExtra
     */
    protected $markdown;

    /**
     * The filesystem instance.
     *
     * @var Filesystem
     */
    protected $files;

    /**
     * Documentation files that should not be indexed.
     *
     * @var array
     */
    protected $noIndex = [
        'contributing',
        'documentation',
        'license',
        'releases',
        'about',
    ];

    /**
     * The list of HTML elements and their importance.
     *
     * @var array
     */
    protected $tags = [
        'h1' => 0,
        'h2' => 1,
        'h3' => 2,
        'h4' => 3,
        'h5' => 4,
        'p'  => 5,
        'td' => 5,
        'li' => 5
    ];

    /**
     * Create a new indexer service.
     *
     * @param  \Illuminate\Contracts\Config\Repository  $config
     * @param  CustomParser  $markdown
     * @param  Filesystem  $files
     * @return void
     */
    public function __construct(Config $config, CustomParser $markdown, Filesystem $files)
    {
        $this->client = SearchClient::create(
            $config->get('algolia.connections.main.id'),
            $config->get('algolia.connections.main.key')
        );

        $this->markdown = $markdown;
        $this->files = $files;

        $this->index = $this->client->initIndex(static::$index_name.'_tmp');
    }

    /**
     * Index all of the available documentation.
     *
     * @param  array  $versions
     * @return void
     */
    public function indexAllDocuments($versions = [])
    {
        if (! $versions) {
            $versions = array_keys(Documentation::getDocVersions());
        }

        $this->index->delete();

        foreach ($versions as $version) {
            $this->indexAllDocumentsForVersion($version);
        }

        $this->setSettings();

        $this->client->moveIndex($this->index->getIndexName(), static::$index_name);
    }

    /**
     * Index all documentation for a given version.
     *
     * @param  string  $version
     * @return void
     */
    public function indexAllDocumentsForVersion($version)
    {
        foreach (glob(resource_path("docs/{{$version},*/{$version}}/*.md"), GLOB_BRACE) as $path) {
            if (! in_array(basename($path, '.md'), $this->noIndex)) {
                $this->indexDocument($version, $path);
            }
        }
    }

    /**
     * Index a given document in Algolia
     *
     * @param string $version
     * @param string $path
     */
    public function indexDocument($version, $path)
    {
        $markdown = Documentation::replaceLinks($version, $this->files->get($path));

        $slug = basename($path, '.md');

        $blocs = $this->markdown->getBlocks($markdown);

        $markup = [];

        $current_link = $slug;

        $current = [
            'h1' => null,
            'h2' => null,
            'h3' => null,
            'h4' => null,
            'h5' => null,
        ];

        $excludedBlocTypes = ['Code', 'Quote', 'Markup', 'FencedCode', 'Comment'];

        foreach ($blocs as $bloc) {
            // If the block type should be excluded, skip it...
            if (isset($bloc['hidden']) || (isset($bloc['type']) && in_array($bloc['type'], $excludedBlocTypes)) || $bloc['element']['name'] == 'ul') {
                continue;
            }

            $element_text = $bloc['element']['text'] ?? null;
            if (is_null($element_text)) {
                continue;
            } elseif ($element_text == '译者署名' || $element_text == '推荐阅读') {
                break;
            }

            if (isset($bloc['type']) && $bloc['type'] == 'Table') {
                foreach ($bloc['element']['text'][1]['text'] as $tr) {
                    $markup[] = $this->getObject($tr['text'][1], $version, $current, $current_link);
                }

                continue;
            }

            if (isset($bloc['type']) && $bloc['type'] == 'List') {
                foreach ($bloc['element']['text'] as $li) {
                    $li['text'] = $li['text'][0];

                    $markup[] = $this->getObject($li, $version, $current, $current_link);
                }

                continue;
            }

            preg_match('/<a name=\"([^\"]*)\">.*<\/a>/iU', $bloc['element']['text'], $link);

            if (count($link) > 0) {
                $current_link = $slug . '#' . $link[1];
            } else {
                $markup[] = $this->getObject($bloc['element'], $version, $current, $current_link);
            }
        }

        $this->index->saveObjects($markup, ['autoGenerateObjectIDIfNotExist' => true]);

        echo "Indexed $version.$slug" . PHP_EOL;
    }

    /**
     * @param $element_name
     * @return mixed
     */
    public function getPositionFromElementName($element_name)
    {
        $elements = ['h1', 'h2', 'h3', 'h4', 'h5'];

        return array_search($element_name, $elements);
    }

    /**
     * Get the object to be indexed in Algolia.
     *
     * @param  array  $element
     * @param  string  $version
     * @param  string  $current_h1
     * @param  string  $current_h2
     * @param  string  $current_h3
     * @param  string  $current_h4
     * @param  string  $current_link
     * @return array
     */
    protected function getObject($element, $version, &$current, &$current_link)
    {
        $text = [
            'h1' => null,
            'h2' => null,
            'h3' => null,
            'h4' => null,
            'h5' => null,
        ];

        $key = $this->getPositionFromElementName($element['name']);

        if ($key !== false) {
            $key = $key + 1; // We actually start at h1
            $current['h'.$key] = $element['text'];
            for ($i = ($key + 1); $i <= 5; $i++) {
                $current["h".$i] = null;
            }
            $text['h'.$key] = $element['text'];
            $content = null;
        } else {
            $content = $element['text'];
        }

        $importance = $this->tags[$element['name']];

        return [
            'objectID'      => $version.'-'.$current_link.'-'.md5($element['text']),
            'h1'            => $current['h1'],
            'h2'            => $current['h2'],
            'h3'            => $current['h3'],
            'h4'            => $current['h4'],
            'h5'            => $current['h5'],
            'text_h1'       => $text['h1'],
            'text_h2'       => $text['h2'],
            'text_h3'       => $text['h3'],
            'text_h4'       => $text['h4'],
            'text_h5'       => $text['h5'],
            'link'          => $current_link,
            'content'       => $content,
            'importance'    => $importance,
            '_tags'         => [$version]
        ];
    }

    /**
     * Configure settings on the Algolia index.
     *
     * @return void
     */
    public function setSettings()
    {
        $this->index->setSettings([
            'attributesToIndex'         => [
                'unordered(text_h1)', 'unordered(text_h2)', 'unordered(text_h3)', 'unordered(text_h4)', 'unordered(text_h5)',
                'unordered(h1)', 'unordered(h2)', 'unordered(h3)', 'unordered(h4)', 'unordered(h5)', 'unordered(content)'
            ],
            'attributesToHighlight'     => ['h1', 'h2', 'h3', 'h4', 'content'],
            'attributesToRetrieve'      => ['h1', 'h2', 'h3', 'h4', '_tags', 'link'],
            'customRanking'             => ['asc(importance)'],
            'ranking'                   => ['words', 'typo', 'attribute', 'proximity', 'custom'],
            'minWordSizefor1Typo'       => 3,
            'minWordSizefor2Typos'      => 7,
            'allowTyposOnNumericTokens' => false,
            'minProximity'              => 2,
            'ignorePlurals'             => true,
            'advancedSyntax'            => true,
            'removeWordsIfNoResults'    => 'allOptional',
        ]);
    }
}
