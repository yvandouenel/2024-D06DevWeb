<?php
class MyClass
{
  public $a = "aaaa";
  protected $b = "bbbb";
  private $c = "ccccc";

  public function getProp($prop)
  {
    foreach ($this as $key => $value) {
      if ($key == $prop) {
        return $value;
      }
    }
    return "Cette propriété n'existe pas";
  }
}

$objet = new MyClass();

echo $objet->getProp('a') . PHP_EOL;
echo $objet->getProp('b') . PHP_EOL;
echo $objet->getProp('c') . PHP_EOL;
echo $objet->getProp('d') . PHP_EOL;
