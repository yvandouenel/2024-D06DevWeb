<?php

namespace Sthom\Kernel;

/**
 * Class Kernel
 *
 * Cette classe représente le noyau de l'application
 * C'est elle qui appelle les différentes classes pour construire l'application
 *
 * Elle contient une méthode statique boot qui utilise la méthode statique loadConfiguration de la classe Configuration
 * pour charger les variables d'environnement du fichier .env vers la superglobale $_ENV
 * Elle utilise ensuite la méthode statique dispatch de la classe Router pour dispatcher la requête HTTP du client vers le contrôleur correspondant
 * qui lui affichera une vue ou renverra une réponse JSON
 *
 * @package Sthom\Kernel
 */
class Kernel
{
    /**
     * Cette méthode permet de d'appeler tous les parties nécessaires pour le bon fonctionnement de l'application
     *
     * @return void
     * @throws \Exception
     */
    public static function boot(): void
    {
        Configuration::loadConfiguration(); // Charge les variables d'environnement du fichier .env

        Router::dispatch(); // redirige la requête HTTP du client vers le contrôleur correspondant
    }
}
