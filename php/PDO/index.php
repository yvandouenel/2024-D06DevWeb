<?php

try {

  // instanciation de PDO
  $dbh = new PDO('mysql:host=localhost;dbname=banque;charset=utf8', 'root');
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);



  // Récupération des paramètres de recherche via la super globale $_POST
  // teste si le client a bien envoyé une valeur qui correspond à la clé "name"
  // Attention ce code est vulnérable aux injections sql du type '; drop table client;
  if (!isset($_POST['lastname']) || empty($_POST['lastname'])) {
    $sql = 'SELECT * FROM client;';
    $pdoStatement = $dbh->prepare($sql);
    $pdoStatement->execute();

    $results = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
  } else {
    $sql = 'SELECT * FROM client WHERE nom LIKE :searchTerm';
    $pdoStatement = $dbh->prepare($sql);
    $pdoStatement->execute(['searchTerm' => '%' . $_POST['lastname'] . '%']);

    $results = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
  }


  foreach ($results as $record) {
    echo $record->nom;
    echo $record->prenom;
  }
} catch (PDOException $e) {
  echo "Pb de connexion à la base de données ", $e->getMessage();
}
