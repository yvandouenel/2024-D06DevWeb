<?php

// Déclaration d'une classe qui va permettre de créer des instances de Product
class Product
{
  // Attributs d'instance privés (encapsulation)
  private string $name;
  private float $price;
  private int $stock;

  public function __construct(string $name, float $price, int $stock)
  {
    $this->name = $name;
    $this->price = $price;
    $this->stock = $stock;
  }
  /**
   * Ajoute des quantités au stock
   * 
   * @return Product
   */
  public function addStock(int $quantity): static
  {
    // Le mutateur (removeStock) modifie l'attribut d'instance stock
    $this->stock += $quantity;
    // Le mutateur renvoie l'instance modifiée (c'est une bonne pratique)
    return $this;
  }
  /**
   * Enlève des quantités au stock
   * 
   * @return Product
   */
  public function removeStock(int $quantity): static
  {
    // Le mutateur (removeStock) modifie l'attribut d'instance stock
    $this->stock -= $quantity;

    // Le mutateur renvoie l'instance modifiée (c'est une bonne pratique)
    return $this;
  }
  public function getPrice()
  {
    // Ici, je peux faire des traitements poru savoir par exemple si l'utilisateur est connecté
    // et selon son classement peut être qu'un coefficient va s'appliquer 
    return $this->price;
  }
}

// Création d'une instance
$computer = new Product("IMac", 999.00, 200);

$screen = new Product("LG", 180.00, 100);

var_dump($computer);

// Appel de la méthode qui ajoute 50 unités
$computer->addStock(50);
var_dump($computer->getPrice());

var_dump($computer);

class Order
{
  // Attributs d'instance privés (encapsulation)
  private array $pdtsQuantities;
  
  // Attribut de class
  private static float $tva = 0.2;

  public function __construct(array $pdtsQuantities = [])
  {
    $this->pdtsQuantities = $pdtsQuantities;
  }
  
  public function calculateTotal(): float
  {
    $result = 0;

    // Parcours le tableau $pdtsQuantities et multiplie le prix de chaque produit par la quantité
    // Renvoie la somme toutes les multiplication en incluant la tva
    foreach($this->pdtsQuantities as  $pdtQuantities){
      pdtQuantities["product"]
    }

  }
  
}
// Instanciation
$order1 = new Order([
  ["product"=>$computer, 10],
  ["product"=>$screen, 10],
]);
