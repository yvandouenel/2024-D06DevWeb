<?php

use Diginamic\Poo\MyClass;
use Entities\MyClass as Entity;

include_once('vendor/autoload.php');

$test = new MyClass();
$test2 = new Entity();

var_dump($test);
var_dump($test2);
