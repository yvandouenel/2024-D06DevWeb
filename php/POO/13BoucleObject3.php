<?php

class MyClass
{
  public $a = "a";
  protected $b = "b";
  private $c = "c";

  public function getProp($prop)
  {
    foreach ($this as $key => $value) {
      if ($key == $prop) {
        return $value;
      }
    }
    return "Cette propriété n'existe pas";
  }

  public function setProp($prop, $propValue)
  {
    foreach ($this as $key => $value) {
      if ($key == $prop) {
        $this->$key = $propValue;
        return $this;
      }
    }

    echo "Cette propriété n'existe pas" . PHP_EOL;
    return $this;
  }
}

$objet = new MyClass();

echo $objet->setProp('a', '1')->getProp('a') . PHP_EOL;
echo $objet->setProp('b', 2)->getProp('b') . PHP_EOL;
echo $objet->setProp('c', 3)->getProp('c') . PHP_EOL;
echo $objet->setProp('d', 4)->getProp('d') . PHP_EOL;
