<?php
/* function customAutoloader($class)
{
  echo "je suis dans customAutoloader et j'ai pour valeur de mon parametre $class" . PHP_EOL;
  include $class . '.php';
}
spl_autoload_register('customAutoloader'); */
spl_autoload_register(function ($class) {
  $class = str_replace('MyName\\', 'entities/', $class);
  include $class . '.php';
});
