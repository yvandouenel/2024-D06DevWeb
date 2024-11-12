<?php

namespace Diginamic\Pdo;

class PDODiginamic
{
  // Le code de cette classe présente deux problèms majeurs :
  // 1 - A chaque fois que j'aurais besoin d'utiliser PDODiginamic, je vais instancier \PDO or 
  //     ce n'est pas optimisé. Il faudra donc mettre en place un design patter "singleton" qui
  //     va m'assurer que j'utiliserai tjs la même instance de PDO
  // 2 - J'utilise en clair les login et mots de passe de mysql or c'est une mauvaise pratique
  //     car ce fichier sera versionné et les identifiants vont donc être présents sur tous les 
  //     ordinateurs qui utiliseront le projet
  //     La solution est d'utiliser des variables d'environnement qui ne seront pas versionnées

  // Attribut
  public \PDO $dbh;

  public function __construct()
  {
    $this->dbh = new \PDO('mysql:host=localhost;dbname=banque;charset=utf8', 'root');
    $this->dbh->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_WARNING);
  }

  public function queryLastname()
  {
    $results = [];
    if (!isset($_POST['lastname']) || empty($_POST['lastname'])) {
      $sql = 'SELECT * FROM client;';
      $pdoStatement = $this->dbh->prepare($sql);
      $pdoStatement->execute();

      $results = $pdoStatement->fetchAll(\PDO::FETCH_OBJ);
    } else {
      $sql = 'SELECT * FROM client WHERE nom LIKE :searchTerm';
      $pdoStatement = $this->dbh->prepare($sql);

      // Exécution de la requête préparée : :searchTerm est remplacé par '%' . $_POST['lastname'] . '%'
      $pdoStatement->execute(['searchTerm' => '%' . $_POST['lastname'] . '%']);

      $results = $pdoStatement->fetchAll(\PDO::FETCH_OBJ);
    }
    return $results;
  }
  public function diplayResults($results)
  {
    foreach ($results as $record) {
      echo $record->nom;
      echo $record->prenom;
    }
  }
}
