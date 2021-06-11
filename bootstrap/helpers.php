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
