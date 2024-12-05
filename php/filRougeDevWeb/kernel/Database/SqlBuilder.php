<?php

namespace Sthom\Kernel\Database;

/**
 * Class SqlBuilder
 * Cette classe permet de générer des requêtes SQL dynamiques avec des paramètres nommés.
 * Elle prend en charge les opérations SELECT, INSERT, UPDATE et DELETE.
 * Chaque méthode retourne une requête SQL ainsi que les paramètres associés.
 *
 * @package Sthom\Kernel\Database
 */
class SqlBuilder
{

    /**
     * Prépare une requête SQL SELECT avec des paramètres nommés.
     *
     * @param string $table Le nom de la table sur laquelle exécuter la requête SELECT.
     * @param array $fields Les colonnes et leurs valeurs pour la clause WHERE (facultatif).
     * @return array Un tableau contenant la requête SQL ('sql') et les paramètres ('values').
     *
     * Exemple d'utilisation :
     * $result = SqlBuilder::prepareSelect('users', ['id' => 1]);
     * Résultat :
     * [
     *    'sql' => 'SELECT id FROM users WHERE id = :id',
     *    'values' => [':id' => 1]
     * ]
     */
    public static function prepareSelect(string $table, array $fields = []): array
    {
        // Début de la requête SQL avec les colonnes à sélectionner.
        // Si $fields est vide, on sélectionne toutes les colonnes avec "*".
        $sql = "SELECT *";

        // Ajout de la table sur laquelle on effectue la requête.
        $sql .= " FROM $table";

        // Si des champs sont fournis, on ajoute une clause WHERE avec des paramètres nommés.
        if (!empty($fields)) {
            // Génère une liste de conditions sous la forme "colonne = :colonne".
            $conditions = implode(" AND ", array_map(fn($key) => "$key = :$key", array_keys($fields)));
            $sql .= " WHERE $conditions";
        }

        // Retourne la requête SQL et les valeurs des paramètres.
        return ["sql" => $sql, "values" => array_combine(
            array_map(fn($key) => ":$key", array_keys($fields)),
            array_values($fields)
        )];
    }

    /**
     * Prépare une requête SQL INSERT avec des paramètres nommés.
     *
     * @param object $class L'objet contenant les données à insérer.
     * @param string $table Le nom de la table dans laquelle insérer les données.
     * @return array Un tableau contenant la requête SQL ('sql') et les paramètres ('values').
     *
     * Exemple d'utilisation :
     * class User {
     *     public string $name = "John";
     *     public int $age = 30;
     * }
     * $result = SqlBuilder::prepareInsert(new User(), 'users');
     * Résultat :
     * [
     *    'sql' => 'INSERT INTO users (name, age) VALUES (:name, :age)',
     *    'values' => [':name' => 'John', ':age' => 30]
     * ]
     */
    public static function prepareInsert(object $class, string $table): array
    {
        // Extrait les propriétés de l'objet sous forme de tableau clé-valeur.
        $data = self::extractObjectProperties($class);

        // Génère la liste des colonnes (exemple : "name, age").
        $columns = implode(", ", array_keys($data));

        // Génère la liste des paramètres nommés (exemple : ":name, :age").
        $placeholders = implode(", ", array_map(fn($key) => ":$key", array_keys($data)));

        // Construit la requête SQL INSERT.
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";

        // Associe chaque paramètre nommé à sa valeur.
        $values = array_combine(
            array_map(fn($key) => ":$key", array_keys($data)),
            array_values($data)
        );

        // Retourne la requête SQL et les valeurs.
        return ["sql" => $sql, "values" => $values];
    }

    /**
     * Prépare une requête SQL UPDATE avec des paramètres nommés.
     *
     * @param object $class L'objet contenant les données à mettre à jour.
     * @param string $table Le nom de la table dans laquelle mettre à jour les données.
     * @param string $primaryKey Le nom de la colonne clé primaire (par défaut "id").
     * @return array Un tableau contenant la requête SQL ('sql') et les paramètres ('values').
     *
     * Exemple d'utilisation :
     * class User {
     *     private int $id = 1;
     *     private string $name = "Jane";
     *     private int $age = 25;
     * }
     * $result = SqlBuilder::prepareUpdate(new User(), 'users');
     * Résultat :
     * [
     *    'sql' => 'UPDATE users SET name = :name, age = :age WHERE id = :id',
     *    'values' => [':name' => 'Jane', ':age' => 25, ':id' => 1]
     * ]
     */
    public static function prepareUpdate(object $class, string $table, string $primaryKey = 'id'): array
    {
        /**
         * Étape 1 : Extraire les données de l'objet sous forme de tableau clé-valeur
         * Cette étape utilise une méthode dédiée `extractObjectProperties` qui récupère toutes les propriétés publiques, privées et protégées de l'objet.
         * On inclut ici la clé primaire pour qu'elle puisse être utilisée dans la clause WHERE.
         */
        $data = self::extractObjectProperties($class, true);

        /**
         * Étape 2 : Vérifier que la clé primaire est bien définie dans les données extraites
         * Si la clé primaire n'est pas trouvée, on lève une exception avec un message explicatif.
         */
        if (!array_key_exists($primaryKey, $data)) {
            throw new \Exception("La clé primaire '$primaryKey' est absente dans les données de l'objet.");
        }

        /**
         * Étape 3 : Récupérer la valeur de la clé primaire et la retirer des données
         * - On stocke la valeur de la clé primaire dans une variable dédiée.
         * - Ensuite, on retire cette clé des données pour éviter qu'elle soit mise à jour dans la requête.
         */
        $primaryKeyValue = $data[$primaryKey];
        unset($data[$primaryKey]);

        /**
         * Étape 4 : Générer la clause SET pour la requête SQL
         * - Exemple de résultat attendu : "name = :name, email = :email, age = :age"
         * - Cette étape est déléguée à une méthode privée `generateSetClause` pour rendre le code plus lisible et réutilisable.
         */
        $setClause = self::generateSetClause($data);

        /**
         * Étape 5 : Construire la requête SQL
         * - La méthode `sprintf` est utilisée pour insérer les valeurs dynamiques dans la requête.
         * - La requête contient :
         *   - Le nom de la table
         *   - La clause SET (avec les paramètres nommés)
         *   - La clause WHERE pour identifier la ligne à mettre à jour
         */
        $sql = sprintf(
            "UPDATE %s SET %s WHERE %s = :%s",
            $table,          // Nom de la table
            $setClause,      // Clause SET (par exemple, "name = :name, age = :age")
            $primaryKey,     // Nom de la clé primaire
            $primaryKey      // Paramètre nommé pour la clé primaire (exemple : ":id")
        );

        /**
         * Étape 6 : Générer les paramètres pour la requête SQL
         * - Cette étape utilise la méthode `generateNamedParameters` pour associer les colonnes et leurs valeurs aux paramètres nommés.
         * - On inclut également la clé primaire et sa valeur dans le tableau des paramètres.
         */
        $parameters = self::generateNamedParameters($data, $primaryKey, $primaryKeyValue);

        /**
         * Étape 7 : Retourner le résultat
         * - Un tableau contenant la requête SQL sous forme de chaîne (`sql`) et les paramètres nommés associés (`values`).
         */
        return ["sql" => $sql, "values" => $parameters];
    }

    /**
     * Méthode privée pour générer la clause SET dans une requête SQL
     *
     * @param array $data Les colonnes et leurs nouvelles valeurs
     * @return string La clause SET sous forme de chaîne SQL (par exemple, "name = :name, age = :age")
     */
    private static function generateSetClause(array $data): string
    {
        /**
         * Étape 1 : Initialiser un tableau pour stocker les clauses SET
         * Chaque élément du tableau aura la forme "colonne = :colonne".
         */
        $setClauses = [];

        /**
         * Étape 2 : Parcourir les colonnes et leurs valeurs
         * - Pour chaque colonne, on ajoute une chaîne formatée "colonne = :colonne" au tableau.
         */
        foreach ($data as $column => $value) {
            $setClauses[] = "$column = :$column";
        }

        /**
         * Étape 3 : Joindre toutes les clauses SET avec une virgule
         * - Exemple de résultat attendu : "name = :name, email = :email, age = :age"
         */
        return implode(", ", $setClauses);
    }

    /**
     * Méthode privée pour générer les paramètres nommés pour une requête SQL
     *
     * @param array $data Les colonnes et leurs valeurs
     * @param string $primaryKey Nom de la clé primaire
     * @param mixed $primaryKeyValue Valeur de la clé primaire
     * @return array Les paramètres nommés sous forme d'un tableau (par exemple, [':name' => 'Jane', ':id' => 1])
     */
    private static function generateNamedParameters(array $data, string $primaryKey, $primaryKeyValue): array
    {
        /**
         * Étape 1 : Initialiser un tableau pour les paramètres nommés
         */
        $parameters = [];

        /**
         * Étape 2 : Ajouter les paramètres pour les colonnes
         * - Chaque colonne est associée à une clé nommée (par exemple, ":colonne").
         */
        foreach ($data as $column => $value) {
            $parameters[":$column"] = $value;
        }

        /**
         * Étape 3 : Ajouter le paramètre pour la clé primaire
         * - On inclut la clé primaire avec son paramètre nommé (par exemple, ":id").
         */
        $parameters[":$primaryKey"] = $primaryKeyValue;

        /**
         * Étape 4 : Retourner le tableau des paramètres
         */
        return $parameters;
    }


    /**
     * Prépare une requête SQL DELETE avec un paramètre nommé.
     *
     * @param string $table Le nom de la table dans laquelle supprimer les données.
     * @param int $id La valeur de la clé primaire pour la suppression.
     * @param string $primaryKey Le nom de la colonne clé primaire (par défaut "id").
     * @return array Un tableau contenant la requête SQL ('sql') et les paramètres ('values').
     *
     * Exemple d'utilisation :
     * $result = SqlBuilder::prepareDelete('users', 42);
     * Résultat :
     * [
     *    'sql' => 'DELETE FROM users WHERE id = :id',
     *    'values' => [':id' => 42]
     * ]
     */
    public static function prepareDelete(string $table, int $id, string $primaryKey = 'id'): array
    {
        // Construit la requête SQL DELETE avec un paramètre nommé.
        $sql = "DELETE FROM $table WHERE $primaryKey = :$primaryKey";

        // Retourne la requête SQL et la valeur associée.
        return ["sql" => $sql, "values" => [":$primaryKey" => $id]];
    }

    /**
     * Extrait les propriétés d'un objet sous forme de tableau clé-valeur.
     *
     * @param object $class L'objet à analyser.
     * @param bool $includePrimaryKey Si true, inclut la clé primaire dans les données.
     * @return array Un tableau des propriétés de l'objet.
     */
    private static function extractObjectProperties(object $class, bool $includePrimaryKey = false): array
    {
        // Initialise la réflexion sur l'objet pour accéder à ses propriétés.
        $reflection = new \ReflectionClass($class);

        // Tableau pour stocker les propriétés extraites.
        $data = [];

        // Parcourt toutes les propriétés de l'objet.
        foreach ($reflection->getProperties() as $property) {
            $property->setAccessible(true); // Rend accessible même les propriétés privées.

            $name = $property->getName(); // Récupère le nom de la propriété.

            // Ignore la clé primaire si elle ne doit pas être incluse.
            if (!$includePrimaryKey && $name === 'id') {
                continue;
            }

            // Vérifie que la propriété est initialisée.
            if (!$property->isInitialized($class)) {
                throw new \Exception("Property '$name' is not initialized.");
            }

            // Ajoute la propriété et sa valeur au tableau.
            $data[$name] = $property->getValue($class);
        }

        // Retourne les données extraites.
        return $data;
    }

    /**
     * Nettoie les données d'un tableau pour garantir leur sécurité avant manipulation ou stockage.
     *
     * Cette méthode permet de nettoyer les données selon leur type pour éviter des erreurs
     * ou des problèmes de sécurité tels que les injections XSS (cross-site scripting).
     * Elle peut aussi accepter une fonction de nettoyage personnalisée si le comportement
     * par défaut ne convient pas.
     *
     * @param array $data Le tableau de données à nettoyer.
     * @param callable|null $customSanitizer (optionnel) Une fonction de nettoyage personnalisée.
     *                                       Si fournie, cette fonction sera utilisée pour traiter
     *                                       chaque valeur du tableau.
     * @return array Un tableau contenant les données nettoyées.
     *
     * Exemple d'utilisation :
     * $data = [
     *     'username' => '<script>alert("XSS")</script>',
     *     'age' => 25,
     *     'is_admin' => true,
     *     'created_at' => new \DateTimeImmutable('2024-01-01 12:00:00')
     * ];
     *
     * $sanitizedData = SqlBuilder::sanitize($data);
     *
     * Résultat :
     * [
     *     'username' => '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;',
     *     'age' => 25,
     *     'is_admin' => 1,
     *     'created_at' => '2024-01-01 12:00:00'
     * ]
     */
    public static function sanitize(array $data, ?callable $customSanitizer = null): array
    {
        /**
         * Étape 1 : Utiliser `array_map` pour appliquer un nettoyage à chaque valeur du tableau
         *
         * - La fonction `array_map` permet de parcourir chaque élément d'un tableau et d'appliquer
         *   une fonction à chaque élément.
         * - Ici, chaque élément du tableau `$data` sera nettoyé par une fonction anonyme.
         */
        return array_map(function ($value) use ($customSanitizer) {
            /**
             * Étape 2 : Vérifier si une fonction de nettoyage personnalisée a été fournie.
             *
             * - Si `$customSanitizer` est défini, on l'utilise pour nettoyer la valeur courante.
             * - Cela permet à l'utilisateur de personnaliser le nettoyage selon ses besoins.
             */
            if ($customSanitizer) {
                return $customSanitizer($value);
            }

            /**
             * Étape 3 : Nettoyer les données en fonction de leur type.
             *
             * - On utilise la fonction native `gettype` pour déterminer le type de la valeur courante.
             * - Chaque type est traité différemment pour garantir que les données restent utilisables et sécurisées.
             */
            switch (gettype($value)) {
                /**
                 * Cas 1 : Type `integer`
                 * - Les entiers sont considérés comme sûrs, donc on les retourne directement.
                 */
                case 'integer':
                    return $value;

                /**
                 * Cas 2 : Type `object`
                 * - Si l'objet est une instance de `DateTimeImmutable`, on le formate en chaîne
                 *   au format standard `Y-m-d H:i:s`.
                 * - Pour les autres types d'objets, on les convertit en chaînes de caractères
                 *   grâce à `(string)` pour éviter des erreurs.
                 */
                case 'object':
                    return $value instanceof \DateTimeImmutable
                        ? $value->format('Y-m-d H:i:s') // Conversion des dates en format standard.
                        : (string) $value;             // Conversion des autres objets en chaîne.

                /**
                 * Cas 3 : Type `boolean`
                 * - Les booléens sont convertis en 1 (pour `true`) ou 0 (pour `false`).
                 * - Cela permet de stocker facilement ces valeurs dans une base de données.
                 */
                case 'boolean':
                    return $value ? 1 : 0;

                /**
                 * Cas par défaut : Autres types (principalement les chaînes de caractères)
                 * - On utilise `htmlspecialchars` pour échapper les caractères spéciaux dans les chaînes
                 *   de caractères, afin d'éviter les attaques XSS (par exemple, `<script>` devient `&lt;script&gt;`).
                 * - On spécifie `ENT_QUOTES` pour échapper aussi les guillemets simples et doubles.
                 */
                default:
                    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
            }
        }, $data); // Fin de l'appel à `array_map`.
    }

}
