<?php
class Person
{
  // Attributs
  public $name;

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

// En dehors de la classe, je créée une instance
$bob = new Person();

// Modification d'un attribut (forcément publique)
$bob->name = "Bob";

// La flèche -> signifie que l'on veut s'adresser à une méthode d'une instance d'objet
$bob->mange();

// Autre instance
$veronique = new Person();
$veronique->mange();
