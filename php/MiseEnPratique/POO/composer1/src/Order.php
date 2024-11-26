<?php
// Déclaration du namespace
namespace Douenel\Poo;

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
  /**
   * Ajoute des produits et leur quantité à la commande en cours
   * 
   * @return Order
   */
  public function addProducts($product, $quantity)
  {
    // Ajout du tableau associatif produc et quantity au tableau indexé $this->pdtsQuantities
    $this->pdtsQuantities[] = ["product" => $product, "quantity" => $quantity];

    // On répercute sur le stock :
    $product->removeStock($quantity);

    return $this;
  }
  public function calculateTotal(): float
  {
    $result = 0;

    // Parcours le tableau $pdtsQuantities et multiplie le prix de chaque produit par la quantité
    // Renvoie la somme toutes les multiplication en incluant la tva
    foreach ($this->pdtsQuantities as  $pdtQuantities) {
      $result += $pdtQuantities["product"]->getPrice() * $pdtQuantities["quantity"] * (1 + Order::$tva);
    }
    return $result;
  }
}
