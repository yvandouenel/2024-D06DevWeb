<?php
// Utilisation des namespaces
use Douenel\Poo\Product;
use Douenel\Poo\Order;

// Va chercher le fichier qui gère l'autoload
include_once('vendor/autoload.php');

// Création des instances de produits
$computer = new Product("IMac", 999.00, 200);
$screen = new Product("LG", 180.00, 100);


// Appel de la méthode qui ajoute 50 unités
$computer->addStock(50);


// Instanciation avec pour argument un tableau de tableaux associatifs
$order1 = new Order();
$order1->addProducts($computer, 100);
// Afficher le total
echo "Total pour la commande : " . $order1->calculateTotal() . "€TTC" . PHP_EOL;

var_dump($computer);
