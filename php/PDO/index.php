<?php

try {
  $dbh = new PDO('mysql:host=localhost;dbname=banque;charset=utf8', 'root');
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

  $sql = 'select * from client';
  $where = ";";

  // Récupération des paramètres de recherche via la super globale $_POST
  // teste si le client a bien envoyé une valeur qui correspond à la clé "name"
  if (isset($_POST["lastname"])) {
    $where = " WHERE nom LIKE '%" . $_POST["lastname"] . "%';";
  }
  echo $sql . $where;
  $req = $dbh->query($sql . $where);

  // fetch renvoie les enregistrements un par un
  // tant qu'il (while) y a un enregistrement, on reste dans la boucle
  while ($record = $req->fetch(PDO::FETCH_OBJ)) {
    // $record utilisé via FETCH_OBJ est un objet qui permet d'accéder aux données 
    // champ par champ avec la syntaxe $record->nom_du_champ
    echo $record->nom;
    echo $record->prenom;
  }
} catch (PDOException $e) {
  echo "Pb de connexion à la base de données ", $e->getMessage();
}
