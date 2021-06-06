<?php

/**
 * SVG helper
 *
 * @param string $src Path to svg in the cp image directory
 * @return string
 */
function svg($src)
{
    return file_get_contents(public_path('assets/svg/' . $src . '.svg'));
}

/**
 * Translate the given message.
 */
function __($key, $replace = [], $locale = null)
{
    static $loaded = [];

    $locale = $locale ?: app('translator')->getLocale();

    if (! isset($loaded[$locale])) {
        $loaded[$locale] = app('files')->exists($full = app('path.lang')."/{$locale}.json")
        ? json_decode(app('files')->get($full), true) : [];
    }

    $line = $loaded[$locale][$key] ?? null;

    if (! isset($line)) {
        $fallback = app('translator')->get($key, $replace, $locale);

        if ($fallback !== $key) {
            return $fallback;
        }
    }

    return $line ?: $key;
}

/**
 * Get the path to the documentation file.
 *
 * @param  string  $version
 * @param  string  $filename
 * @return string
 */
function doc_path($version, $filename)
{
    if ($locale = request()->attributes->get('locale')) {
        $path = resource_path("docs/$locale/$version/$filename");

        if (file_exists($path)) {
            return $path;
        }
    }

    return resource_path("docs/$version/$filename");
}
