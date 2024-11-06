<?php
class A
{
  private $name;
  private function __construct($name = null)
  {
    $this->name = $name;
  }

  public static function objetFromName($name)
  {
    $objet = new A($name);
    return $objet;
  }

  public static function objetFromArray($array)
  {
    if (array_key_exists('name', $array)) {
      $objet = new A($array['name']);
      return $objet;
    }
    // Le code ci-dessous ne sera exécuté que si le tableau $array n'a pas la clé "name" car 
    // le bloc de la condition contient un return qui stoppe l'exécution de la méthode
    $objet = new static();
    return $objet;
  }
}
// instanciation impossible en dehors de la classe
//$objTest = new A("test");
// Pour créer une instance, je ne peux pas utiliser directement le constructeur car il est private
// En revanche je peux passer par la méthode publique et statique objetFromName
$obj1 = A::objetFromName("nom1");
var_dump($obj1);

// Une autre méthode possible pour créer un objet est d'utiliser la méthode publique et statique objetFromArray
$obj2 = A::objetFromArray(["name" => "nom2"]);
var_dump($obj2);

$obj3 = A::objetFromArray(["titi" => "nom2"]);
var_dump($obj3);
