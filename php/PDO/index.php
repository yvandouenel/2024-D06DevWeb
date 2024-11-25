<?php
echo phpinfo();

use Diginamic\Pdo\PDODiginamic;

// Il faut charger l'autoload
include_once 'vendor/autoload.php';


try {
  // Instanciation de PDODiginamic
  $pdoDiginamic = new PDODiginamic();

  // Appel de la méthode queryLastName et affectation des résultats à $results
  $results = $pdoDiginamic->queryLastname();

  // Affichage des résultats
  $pdoDiginamic->diplayResults($results);
} catch (PDOException $e) {
  echo "Pb de connexion à la base de données ", $e->getMessage();
}
