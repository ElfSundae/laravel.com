<?php

namespace App\Console\Commands;

use App\Documentation;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;

class CacheSite extends Command
{
    const CACHE_DIR = 'storage/site-cache';

    protected $signature = 'cache-site';
    protected $description = 'Cache the whole website';

    public function handle()
    {
        // Clear the parsed doc markdown cache
        $this->call('cache:clear');

        // File::deleteDirectory($this->getCachePath(), true);

        $routeUrls = array_map('url', $this->getRoutePaths());

        $this->saveResponseForUrls($routeUrls);

        $this->cleanCacheDirectory($routeUrls);

        $this->saveSitemap(array_merge($routeUrls, $this->getApiUrls()));
    }

    protected function getRoutePaths()
    {
        $routes = [];

        // Routes
        foreach (Route::getRoutes() as $route) {
            $uri = $route->uri();
            if (! Str::is('docs/*', $uri)) {
                $routes[] = $uri;
            }
        }

        // Docs content pages
        $docFiles = array_values(array_unique(
            glob(resource_path('docs/{*,*/*}{,/*.md}'), GLOB_BRACE) ?: []
        ));
        $docsRoot = resource_path('docs/');
        $docVersions = array_keys(Documentation::getDocVersions());
        foreach ($docFiles as $path) {
            if (! mb_check_encoding(pathinfo($path, PATHINFO_BASENAME), 'ASCII')) {
                continue;
            }

            $path = Str::replaceFirst($docsRoot, '', $path);
            $path = Str::replaceLast('.md', '', $path);
            $segments = explode('/', $path);

            if (in_array($segments[0], $docVersions, true)) {
                array_unshift($segments, 'docs');
            } else {
                $locale = array_shift($segments);
                array_unshift($segments, $locale, 'docs');
            }

            $routes[] = implode('/', $segments);
        }

        // Other pages
        $routes[] = '404';

        $result = $routes;

        // Localized pages
        foreach (config('locales', []) as $locale) {
            foreach ($routes as $path) {
                if (explode('/', $path)[0] !== $locale) {
                    $result[] = trim($locale.'/'.trim($path, '/'), '/');
                }
            }
        }

        return array_filter(array_unique($result));
    }

    protected function getApiUrls()
    {
        return array_map(function ($version) {
            return url("api/$version/");
        }, ['5.5', '5.8', '6.x', '7.x', '8.x', '9.x', '10.x', '11.x', 'master']);
    }

    protected function saveResponseForUrls($urls)
    {
        $currentRequest = app('request');

        foreach ($urls as $url) {
            $request = Request::createFromBase(SymfonyRequest::create($url));
            $response = app('Illuminate\Contracts\Http\Kernel')->handle($request);

            // Restore current request
            app()->instance('request', $currentRequest);
            Facade::clearResolvedInstance('request');
            $this->restoreLocale();

            // Note: use $url (not $request->path()) to get cache path
            $path = urldecode(parse_url($url, PHP_URL_PATH) ?: '/');
            $filename = (trim($path, '/') ?: 'index').'.html';

            $this->saveFile($filename, $response->getContent(), true);
        }

        $this->info('Cached '.count($urls).' pages.');
    }

    protected function restoreLocale()
    {
        // HandleLocale middleware changed app locale and root url of UrlGenerator.
        app()->setLocale('en');
        app('url')->forceRootUrl(request()->root());
    }

    protected function cleanCacheDirectory($urls)
    {
        $rootUrl = request()->root();
        $rootDir = $this->getCachePath();
        $files = array_map(function ($value) use ($rootUrl, $rootDir) {
            return Str::replaceFirst($rootUrl, $rootDir, $value).'.html';
        }, $urls);

        $existFiles = glob($rootDir.'/{*,*/*,*/*/*}.html', GLOB_BRACE) ?: [];
        $existFiles = array_filter($existFiles, function ($value) {
            return ! Str::endsWith($value, ['/index.html']);
        });

        File::delete(array_diff($existFiles, $files));

        system('find "'.$rootDir.'" -type d -empty -delete');
    }

    protected function saveSitemap($urls)
    {
        $filename = 'sitemap.txt';
        $this->saveFile($filename, implode(PHP_EOL, $urls));
        $this->info('Sitemap: '.$this->getCacheUrl($filename));
    }

    protected function saveFile($filename, $content, $checkHash = false)
    {
        $path = $this->getCachePath($filename);

        // If the file did not change, keeping the original file for
        // cache-control usage, i.e. 304 response.
        if ($checkHash && file_exists($path) && md5_file($path) == md5($content)) {
            return;
        }

        if (! is_dir($dir = pathinfo($path, PATHINFO_DIRNAME))) {
            @mkdir($dir, 0775, true);
        }

        file_put_contents($path, $content);
    }

    protected function getCachePath($path = '')
    {
        return public_path(static::CACHE_DIR.$this->prefixedPath($path));
    }

    protected function getCacheUrl($path = '')
    {
        return url(static::CACHE_DIR.$this->prefixedPath($path));
    }

    protected function prefixedPath($path = '')
    {
        $path = trim($path, '/');

        return $path ? '/'.$path : '';
    }
}
