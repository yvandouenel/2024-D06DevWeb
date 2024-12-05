<?php

namespace Sthom\Kernel\Database;

/**
 * Class Hydrator
 * Cette classe permet d'hydrater un objet à partir d'un tableau associatif de données.
 * Elle utilise la réflexion pour définir les propriétés de l'objet dynamiquement.
 *
 * @package Sthom\Kernel\Database
 */
class Hydrator
{
    /**
     * Hydrate un objet en utilisant un tableau de données.
     *
     * Cette méthode crée une instance de la classe spécifiée dans `$model` et
     * assigne les valeurs du tableau `$data` aux propriétés correspondantes de l'objet.
     *
     * @param array $data Tableau associatif où les clés représentent les noms des propriétés
     *                    et les valeurs représentent les valeurs à assigner.
     * @param string $model Le nom de la classe à hydrater (doit inclure le namespace complet).
     * @return object Une instance de la classe `$model` avec les propriétés assignées.
     *
     * Exemple d'utilisation :
     * ```
     * class User {
     *     private string $name;
     *     private int $age;
     * }
     *
     * $data = ['name' => 'John', 'age' => 30];
     * $user = Hydrator::hydrate($data, User::class);
     * // $user est maintenant une instance de la classe User avec les propriétés définies.
     * // $user->getName() retourne 'John'
     * // $user->getAge() retourne 30
     *
     * ```
     */
    public static function hydrate(array $data, string $model): object
    {
        // Étape 1 : Créer une nouvelle instance de la classe spécifiée par `$model`
        // Le constructeur par défaut est appelé automatiquement.
        $object = new $model();

        /**
         * Étape 2 : Parcourir chaque élément du tableau `$data`
         * - La clé `$property` représente le nom de la propriété à définir.
         * - La valeur `$value` représente la valeur à assigner à cette propriété.
         */
        foreach ($data as $property => $value) {
            // Vérifie si l'objet possède une propriété nommée `$property`
            if (property_exists($object, $property)) {
                // Étape 3 : Utiliser la réflexion pour accéder à la propriété privée/protégée/publique
                $reflection = new \ReflectionProperty($object, $property);
                $reflection->setAccessible(true); // Permet d'accéder aux propriétés privées/protégées

                // Étape 4 : Convertir la valeur au type attendu en utilisant `castValue`
                // Cette méthode gère la conversion automatique en fonction du type déclaré.
                $reflection->setValue($object, self::castValue($value, $reflection));
            }
        }

        // Étape 5 : Retourner l'objet hydraté
        return $object;
    }

    /**
     * Convertit une valeur au type attendu en fonction du type déclaré de la propriété.
     *
     * @param mixed $value La valeur à convertir.
     * @param \ReflectionProperty $reflection Une instance de `ReflectionProperty` représentant
     *                                        la propriété de l'objet à définir.
     * @return mixed La valeur convertie au type attendu.
     * @throws \Exception Si le type déclaré est invalide ou non pris en charge.
     *
     * Exemple :
     * - Si une propriété attend un `int`, la valeur sera convertie en entier.
     * - Si une propriété attend une instance de `DateTimeImmutable`, une nouvelle instance
     *   sera créée à partir de la valeur donnée.
     */
    private static function castValue(mixed $value, \ReflectionProperty $reflection): mixed
    {
        /**
         * Étape 1 : Obtenir le type déclaré de la propriété
         * - La méthode `getType` retourne un objet représentant le type déclaré.
         * - `?->getName()` retourne le nom du type, ou `null` si aucun type n'est déclaré.
         */
        $type = $reflection->getType()?->getName();

        /**
         * Étape 2 : Utiliser une structure `match` pour effectuer la conversion
         * - `match` est une alternative à `switch`, introduite dans PHP 8, qui retourne directement une valeur.
         * - Chaque case vérifie si le type correspond, puis applique une conversion.
         */
        return match ($type) {
            // Si le type est `DateTimeImmutable`, créer une nouvelle instance avec la valeur donnée.
            \DateTimeImmutable::class => new \DateTimeImmutable($value),

            // Si le type est `bool`, convertir la valeur en booléen.
            'bool' => (bool)$value,

            // Si le type est `int`, convertir la valeur en entier.
            'int' => (int)$value,

            // Si le type est `float`, convertir la valeur en nombre à virgule flottante.
            'float' => (float)$value,

            // Si le type est `string`, convertir la valeur en chaîne.
            'string' => (string)$value,

            // Par défaut, retourner la valeur sans modification.
            default => $value,
        };
    }
}
