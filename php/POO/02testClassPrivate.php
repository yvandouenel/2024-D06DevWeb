<?php
class MaClasse
{
  private $name;
  public function getName()
  {
    // Possibilité d'ajout de traitements (l'utilisateur a t-il le droit de voir le nom par exemple)
    return $this->name;
  }
  public function setName($name)
  {
    // Possibilité d'ajout de traitements (la valeur donnée via l'argument est-elle cohérente ?) 
    // $this->name est l'attribut auquel on assigne une nouvelle valeur qui correspond à l'argument stocké dans le paramètre. On parle de setter ou de mutateur
    $this->name = $name;
    // Retourne l'instance
    return $this;
  }
}

$monObjet = new MaClasse();
// J'affiche la proprité name de l'objet retourné par setName. On appelle cette façon de coder du chaînage
//echo $monObjet->setName('Jules')->getName();
var_dump($monObjet);
var_dump($monObjet->setName('Jules'));
/* $monObjet->setName('Jules');
echo $monObjet->getName(); */
