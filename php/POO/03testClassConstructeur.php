<?php
class Person
{


  // Constructeur
  public function __construct(public string $name, public string $email = "toto@gmail.com") // paramètres
  {}

  // Méthodes
  public function mange()
  {
    // Affichage comprenant l'attribut name
    if (isset($this->name)) {
      echo $this->name . " mange()" . PHP_EOL;
    } else {
      echo "Machin (qui est NULL) mange()" . PHP_EOL;
    }
  }
}

// En dehors de la classe, je crée une instance
$bob = new Person("Bob"); // arguments
var_dump($bob);
