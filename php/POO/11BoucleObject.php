<?php

class A
{
  public $a = "aaaa";
  public $b = "bbbb";
  public $c = "cccc";

  protected $d = "protégée";
  private $e = "privée";

  public function dumpAttributes()
  {
    foreach ($this as $key => $value) {
      echo "$key = $value" . PHP_EOL;
    }
  }
}

$objet = new A();
$objet->dumpAttributes();

/* foreach ($objet as $key => $value) {
  echo "$key = $value" . PHP_EOL;
} */
