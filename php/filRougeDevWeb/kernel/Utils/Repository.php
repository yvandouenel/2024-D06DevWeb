<?php

namespace Sthom\Kernel\Utils;

use Sthom\Kernel\Database\Database;
use Sthom\Kernel\Database\Hydrator;
use Sthom\Kernel\Database\SqlBuilder;

/**
 * Class Repository
 * Cette classe représente un repository générique permettant d'effectuer des opérations CRUD
 * (Create, Read, Update, Delete) sur une table de la base de données.
 * Elle mappe automatiquement les résultats SQL sur des objets du modèle passé en paramètre.
 */
class Repository
{
    private ?string $sql;              // Contient la requête SQL en cours d'exécution
    private ?\PDOStatement $request;  // Contient la requête préparée PDO
    private string $table;            // Nom de la table associée au modèle

    /**
     * Constructeur de la classe Repository.
     * Initialise la table associée en vérifiant si le modèle possède une constante `TABLE`.
     *
     * @param string $model Le namespace complet de la classe du modèle (exemple : `App\Models\User`).
     * @throws \Exception Si la constante `TABLE` n'est pas définie dans la classe modèle.
     */
    public function __construct(private readonly string $model)
    {
        // Vérifie si le modèle possède une constante `TABLE` définissant le nom de la table associée.
        if (defined($this->model . '::TABLE')) {
            $this->table = $this->model::TABLE;
        } else {
            throw new \Exception("La classe $this->model doit définir une constante TABLE pour fonctionner.");
        }
    }

    /**
     * Supprime un enregistrement de la table par son ID.
     *
     * @param int $id L'identifiant de l'enregistrement à supprimer.
     * @return void
     */
    public final function delete(int $id): void
    {
        // Prépare une requête DELETE à l'aide de SqlBuilder.
        $query = SqlBuilder::prepareDelete($this->table, $id);
        $this->sql = $query['sql'];

        // Exécute la requête préparée avec les paramètres.
        $this->prepare($query['values']);
    }

    /**
     * Récupère un enregistrement par son ID.
     *
     * @param int $id L'identifiant de l'enregistrement à récupérer.
     * @return object|null L'objet du modèle hydraté ou `null` si aucun résultat n'est trouvé.
     */
    public final function getById(int $id): ?object
    {
        return $this->getByAttributes(['id' => $id], false);
    }

    /**
     * Récupère tous les enregistrements de la table associée.
     *
     * @return array|null Un tableau d'objets hydratés ou `null` si aucun résultat n'est trouvé.
     */
    public final function getAll(): ?array
    {
        return $this->getByAttributes([]);
    }

    /**
     * Récupère les enregistrements correspondant aux attributs passés.
     *
     * @param array $attributes Un tableau associatif des colonnes et de leurs valeurs recherchées.
     * @param bool $all (optionnel) Si `true`, retourne tous les résultats. Sinon, retourne le premier.
     * @return mixed Les résultats sous forme d'objets hydratés ou un seul objet.
     */
    public final function getByAttributes(array $attributes, bool $all = true): mixed
    {
        // Prépare une requête SELECT avec les attributs donnés.
        $query = SqlBuilder::prepareSelect($this->table, $attributes);
        $this->sql = $query['sql'];
        // Exécute la requête préparée avec les paramètres.
        $this->prepare($query['values']);

        // Récupère le résultat (un ou plusieurs enregistrements).
        return $this->getResult($all);
    }

    /**
     * Insère un nouvel enregistrement dans la table.
     *
     * @param object $entity Une instance du modèle contenant les données à insérer.
     * @return void
     */
    public final function insert(object $entity): void
    {
        // Prépare une requête INSERT à l'aide de SqlBuilder.
        $query = SqlBuilder::prepareInsert($entity, $this->table);
        $this->sql = $query['sql'];

        // Exécute la requête préparée avec les paramètres.
        $this->prepare($query['values']);
    }

    /**
     * Met à jour un enregistrement existant dans la table.
     *
     * @param object $entity Une instance du modèle contenant les nouvelles données.
     * @return void
     * @throws \Exception Si l'entité ne possède pas de clé primaire ou si une erreur survient.
     */
    public final function update(object $entity): void
    {
        // Prépare une requête UPDATE à l'aide de SqlBuilder.
        $query = SqlBuilder::prepareUpdate($entity, $this->table);
        $this->sql = $query['sql'];

        // Exécute la requête préparée avec les paramètres.
        $this->prepare($query['values']);
    }

    /**
     * Prépare et exécute une requête SQL avec les paramètres donnés.
     *
     * @param array|null $args (optionnel) Les paramètres à associer à la requête.
     * @return void
     */
    public final function prepare(?array $args = null): void
    {
        // Nettoie les paramètres pour éviter les injections SQL.
        $args = SqlBuilder::sanitize($args);

        // Prépare la requête SQL avec PDO et exécute-la.
        $this->request = Database::getConnexion()->prepare($this->sql);
        $this->request->execute($args);
    }

    /**
     * Récupère les résultats de la requête SQL.
     *
     * @param bool $all (optionnel) Si `true`, retourne tous les résultats. Sinon, retourne le premier.
     * @return mixed Un tableau d'objets ou un seul objet.
     */
    private function getResult(bool $all = true): mixed
    {
        // Récupère tous les résultats de la requête.
        $result = $this->fetchAll();

        // Retourne les résultats selon la valeur de `$all`.
        if ($result) {
            return $all ? $result : $result[0];
        }
        return null;
    }

    /**
     * Récupère tous les enregistrements de la requête SQL.
     *
     * @return array Un tableau d'objets hydratés.
     */
    public function fetchAll(bool $isCustom = false): array
    {
        // Récupère les résultats sous forme de tableau associatif.
        $results = $this->request->fetchAll(\PDO::FETCH_ASSOC);

        // Convertit chaque ligne de données en objet du modèle en utilisant `hydrate`.
        return $isCustom ? $results : array_map(fn($data) => $this->hydrate($data), $results);
    }

    /**
     * Hydrate une ligne de données pour en faire une instance du modèle.
     *
     * @param array $data Les données récupérées de la base de données.
     * @return object Une instance du modèle hydratée.
     */
    private function hydrate(array $data): object
    {
        // Utilise la classe `Hydrator` pour convertir les données en objet du modèle.
        return Hydrator::hydrate($data, $this->model);
    }

    /**
     * Permet de faire une requête SQL personnalisée.
     *
     * @param string $sql La requête SQL à exécuter. VEILLEZ À UTILISER LES PARAMÈTRES NOMMÉS.
     * @param array|null $args (optionnel) Les paramètres à associer à la requête.
     * @return mixed Les résultats de la requête.
     */
    public function customQuery(string $sql, ?array $args = null): mixed
    {
        // Prépare la requête SQL avec PDO et exécute-la.
        $this->request = Database::getConnexion()->prepare($sql);
        $this->request->execute($args);

        // Récupère les résultats de la requête.
        return $this->fetchAll(true);
    }
}
