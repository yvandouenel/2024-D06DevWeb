<?php
class A
{
  public static $multiplicateur = 2;
  public function multiplier($nombre)
  {
    echo "$nombre x " . self::$multiplicateur . "=" . ($nombre * self::$multiplicateur) . PHP_EOL;
  }
}

echo "Appel de la propriété statique en dehors du contexte objet " . A::$multiplicateur . PHP_EOL;

$objetA = new A();
$objetA->multiplier(2);
$objetB = new A();
$objetB->multiplier(4);

echo PHP_EOL . 'Modification de la propriété statique $multplicateur' . PHP_EOL;

A::$multiplicateur = 3;
$objetA->multiplier(2);
$objetB->multiplier(4);
