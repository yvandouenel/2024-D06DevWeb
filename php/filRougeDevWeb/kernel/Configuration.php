<?php

namespace Sthom\Kernel;

use Dotenv\Dotenv;

/**
 * Cette classe permet de charger la configuration de l'application
 * Elle utilise la bibliothèque Dotenv pour charger le fichier .env
 *
 * Voir la documentation de Dotenv pour plus d'informations
 *
 * Class Configuration
 * @package Sthom\Kernel
 */
class Configuration
{

    /**
     * Cette méthode permet de charger la configuration de l'application
     * Elle utilise la bibliothèque Dotenv pour charger les variables d'environnement du fichier .env vers la superglobale $_ENV
     *
     * @return void
     *
     */
    public static function loadConfiguration(): void
    {
        // Charge les variables d'environnement du fichier .env, envoit les variables d'environnement dans la superglobale $_ENV
        Dotenv::createImmutable(__DIR__ . '/../')->load();
    }

}