<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Documentation\Indexer;

class IndexDocuments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'docs:index {version?*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Index all documentation on Algolia';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        app(Indexer::class)->indexAllDocuments($this->argument('version'));
    }
}
