<?php

namespace App\Providers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Events\LocaleUpdated;
use Illuminate\Foundation\Http\Events\RequestHandled;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The default locale of application.
     *
     * @var string
     */
    protected $defaultLocale;

    /**
     * Create a new service provider instance.
     *
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($app)
    {
        parent::__construct($app);

        $this->defaultLocale = $app->getLocale();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('lang', function ($expression) {
            return "<?php echo __($expression); ?>";
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->setupConfiguration();

        $this->registerEventListeners();

        $this->app->rebinding('request', function ($app, $request) {
            $this->handleLocaleForRequest($request);
        });
    }

    /**
     * Setup application configuration.
     *
     * @return void
     */
    protected function setupConfiguration()
    {
        config()->set('locales', ['zh']);
    }

    /**
     * Register event listeners.
     *
     * @return void
     */
    protected function registerEventListeners()
    {
        Event::listen(
            class_exists(LocaleUpdated::class) ? LocaleUpdated::class : 'locale.changed',
            function ($locale) {
                if ($locale instanceof LocaleUpdated) {
                    $locale = $locale->locale;
                }

                $this->setRootUrlForLocale($locale);
            }
        );

        Event::listen(
            class_exists(RequestHandled::class) ? RequestHandled::class : 'kernel.handled',
            function ($request, $response = null) {
                if ($request instanceof RequestHandled) {
                    list($request, $response) = [
                        $request->request, $request->response,
                    ];
                }

                $this->replaceLinksForResponse($request, $response);
            }
        );
    }

    /**
     * Set root URL to UrlGenerator for the given locale.
     *
     * @param  string  $locale
     */
    protected function setRootUrlForLocale($locale)
    {
        $rootUrl = $this->app['request']->root();

        if ($locale != $this->defaultLocale) {
            $rootUrl .= '/'.$locale;
        }

        $this->app['url']->forceRootUrl($rootUrl);
    }

    /**
     * Replace links for response content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     * @return \Illuminate\Http\Response
     */
    protected function replaceLinksForResponse($request, $response)
    {
        $rootUrl = $request->root();

        // Replace path in a.href to `url(path)` for path links
        $content = preg_replace_callback(
            '#(<a[^>]+href=["\'])([^"\']+)#i',
            function ($matches) use ($rootUrl) {
                $ltrimed = ltrim($matches[2], '/');
                if (preg_match(
                    '#^(api|assets|build|storage)$#',
                    explode('/', $ltrimed)[0]
                )) {
                    return $matches[1].$rootUrl.'/'.$ltrimed;
                }

                return $matches[1].url($matches[2]);
            },
            $response->getContent()
        );

        // Replace route URLs
        $content = preg_replace_callback(
            '#https?://laravel.com/(docs)#i',
            function ($matches) {
                return url($matches[1]);
            },
            $content
        );

        // Replace https?://laravel.com/ to `$rootURL/` for public assets and api links
        $content = preg_replace(
            '#https?://laravel.com/#i',
            $rootUrl.'/',
            $content
        );

        return $response->setContent($content);
    }

    /**
     * Remove locale prefix in URI, and set locale for application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function handleLocaleForRequest($request)
    {
        $uri = $request->server->get('REQUEST_URI');

        if ($locale = $this->getLocaleFromUri($uri, $prefix)) {
            $uri = '/'.ltrim(Str::replaceFirst($prefix, '', $uri), '/');

            $request->server->set('REQUEST_URI', $uri);
            $request->attributes->set('locale', $locale);

            $this->app->setLocale($locale);
        } else {
            $this->app->setLocale(
                $request->attributes->get('locale') ?: $this->defaultLocale
            );
        }
    }

    /**
     * Get the locale segment from request URI.
     *
     * @param  string  $uri
     * @param  string|null &$prefix
     * @return string|null
     */
    protected function getLocaleFromUri($uri, &$prefix = null)
    {
        if ($locale = explode('/', $uri)[1] ?? null) {
            if (in_array($locale, config('locales'), true)) {
                $prefix = '/'.$locale;

                return $locale;
            }
        }
    }
}
