<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HandleLocale
{
    /**
     * The default application locale.
     *
     * @var string
     */
    protected $defaultLocale;

    /**
     * Supported application locales other than the default locale.
     *
     * @var array
     */
    protected $otherLocales = ['zh'];

    /**
     * @var \Illuminate\Contracts\Foundation\Application
     */
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->defaultLocale = $app->getLocale();
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $this->setLocaleFromRequest($request);

        return $this->replaceLinksForResponse($request, $next($request));
    }

    /**
     * Set the current application locale according to the locale prefix from
     * URI, then remove the locale prefix to let the routing works like normal.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function setLocaleFromRequest($request)
    {
        $uri = $request->server->get('REQUEST_URI');

        // Get the current locale from URI
        $locale = explode('/', $uri)[1] ?? null;
        if (! in_array($locale, $this->otherLocales)) {
            return;
        }

        $prefix = '/'.$locale;

        // New URI without the locale prefix
        $uri = '/'.ltrim(Str::replaceFirst($prefix, '', $uri), '/');

        // Set the request URI excepting locale prefix
        $request->server->set('REQUEST_URI', $uri);
        $request->attributes->set('locale', $locale);

        // Set the application locale
        $this->app->setLocale($locale);

        // Set the localized root URL for UrlGenerator
        $this->app['url']->forceRootUrl($request->root().$prefix);
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
                    '#^(api|assets|css|fonts|js|page-cache|build|storage)$#',
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
}
