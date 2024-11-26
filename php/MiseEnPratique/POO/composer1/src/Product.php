<?php
// Déclaration du namespace
namespace Douenel\Poo;

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
