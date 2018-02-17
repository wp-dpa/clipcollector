<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8909b3950a521d7b776d80bd91debf95
{
    public static $files = array (
        '6e6b5c585c92f6ff290f6b8ef7311d09' => __DIR__ . '/..' . '/ptcong/easyrequest/src/helpers.php',
    );

    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Psr\\Http\\Message\\' => 17,
        ),
        'E' => 
        array (
            'EasyRequest\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'EasyRequest\\' => 
        array (
            0 => __DIR__ . '/..' . '/ptcong/easyrequest/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8909b3950a521d7b776d80bd91debf95::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8909b3950a521d7b776d80bd91debf95::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
