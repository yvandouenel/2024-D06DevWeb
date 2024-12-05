<?php

namespace Sthom\Kernel\Utils;

/**
 * Class AbstractController
 * Cette classe définit des méthodes communes à tous les contrôleurs.
 * Elle fournit des fonctionnalités pour :
 * - Envoyer des réponses JSON
 * - Rendre des vues HTML
 * - Effectuer des redirections HTTP
 *
 * @package Sthom\Kernel\Utils
 */
class AbstractController
{

    /**
     * Méthode pour envoyer une réponse JSON au client.
     *
     * Cette méthode encode un tableau PHP en JSON et l'envoie au client
     * avec un code de statut HTTP. Elle est utile pour les APIs REST.
     *
     * @param array $data Les données à encoder en JSON.
     * @param int $status (optionnel) Le code de statut HTTP à envoyer (par défaut 200).
     * @return void
     *
     * Exemple d'utilisation :
     * ```php
     * $controller = new AbstractController();
     * $controller->json(['message' => 'Success'], 200);
     * ```
     * Résultat : Une réponse HTTP contenant `{"message":"Success"}` avec un statut HTTP 200.
     */
    public final function json(array $data, int $status = 200): void
    {
        try {
            // Définit le code de statut HTTP pour la réponse (exemple : 200, 404).
            http_response_code($status);

            // Définit l'en-tête HTTP pour indiquer que le contenu est de type JSON.
            header('Content-Type: application/json');


            // Encode les données en JSON et les envoie au client.
            //echo json_encode($data);


            // Termine l'exécution du script pour éviter d'envoyer des données supplémentaires.
            die();
        } catch (\Exception $e) {
            // En cas d'erreur, affiche le message d'exception et arrête le script.
            echo $e->getMessage();
            exit();
        }
    }

    /**
     * Méthode pour afficher une vue HTML en y injectant des données dynamiques.
     *
     * Cette méthode rend un document HTML en incluant une vue spécifique
     * tout en passant des variables à celle-ci. Elle est utilisée pour
     * les applications web basées sur des vues.
     *
     * @param string $path Le chemin du fichier de vue (sans extension `.php`).
     * @param array $data (optionnel) Les données dynamiques à injecter dans la vue.
     * @param int $status (optionnel) Le code de statut HTTP (par défaut 200).
     * @return void
     *
     * Exemple d'utilisation :
     * ```php
     * $controller = new AbstractController();
     * $controller->render('home', ['title' => 'Bienvenue'], 200);
     * ```
     * Cela inclura le fichier `Views/home.php` et injectera une variable `$title` avec la valeur `'Bienvenue'`.
     */
    public final function render(string $path, array $data = [], int $status = 200): void
    {
        try {
            // Définit le code de statut HTTP pour la réponse (exemple : 200, 404).
            http_response_code($status);

            // Définit l'en-tête HTTP pour indiquer que le contenu est de type HTML.
            header('Content-Type: text/html');

            // Extrait les clés du tableau `$data` en tant que variables disponibles dans la vue.
            // Exemple : ['title' => 'Bienvenue'] => $title = 'Bienvenue';
            extract($data);

            // Définit le chemin complet du fichier de vue demandé.
            $view = __DIR__ . "/../../src/Views/" . $path;

            // Inclut le fichier de base HTML (layout principal).
            include __DIR__ . "/../../src/Views/base.php";

            // Termine l'exécution du script pour éviter d'envoyer des données supplémentaires.
            die();
        } catch (\Exception $e) {
            // En cas d'erreur, affiche le message d'exception et termine le script.
            echo $e->getMessage();
            die();
        }
    }

    /**
     * Méthode pour rediriger l'utilisateur vers une autre URL.
     *
     * Cette méthode utilise un en-tête HTTP pour effectuer une redirection.
     * Elle est utile pour rediriger les utilisateurs après un traitement,
     * comme une soumission de formulaire.
     *
     * @param string $route L'URL ou la route vers laquelle rediriger.
     * @return void
     *
     * Exemple d'utilisation :
     * ```php
     * $controller = new AbstractController();
     * $controller->redirect('/login');
     * ```
     * Cela redirigera l'utilisateur vers `/login`.
     */
    public final function redirect(string $route): void
    {
        // Définit l'en-tête HTTP pour rediriger l'utilisateur vers une autre URL.
        header('Location: ' . $route);
    }
}
