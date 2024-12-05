<?php
require_once __DIR__ . '/../vendor/autoload.php';


use Sthom\Kernel\Kernel;

try {
    session_start();

    Kernel::boot();
} catch (Exception $e) {
    if ($_ENV['DEBUG'] === 'false') {
        echo "<h1>Une erreur est survenue</h1>";
        exit();
    }
    dd($e->getMessage());
}
