<?php

/**
 * Pour rappel, le format json est composé de clés et de valeurs
 * Les caractères à utiliser sont : 
 *  {}
 *  ""
 *  :
 *  ,
 *  []
 */


if (isset($_POST['comment'])) {
  $string = '{"' . $_POST['name'] . '" : "' . $_POST["comment"] . '"},' . PHP_EOL;
  echo $string;
  file_put_contents('comments.json', $string, FILE_APPEND) . PHP_EOL;
  $json = file_get_contents('comments.json');
  echo $json;
}

// Vérifie si le fichier json  existe déjà
    // Créer un tableau associatif avec les données récupérées via le formulaire
    // Utiliser json_encode pour encoder le tableau en json 
    // Utiliser fopen et fwrite pour écrire le json dans le fichier (cf support de cours "Travailler avec des fichiers dans le php impératif)

// Si le fichier existe, le récupérer et le transformer en tableau
    // Ajouter une valeur à ce tableau 
    // Utiliser json_encode pour encoder le tableau en json 
    // Utiliser fopen et fwrite pour écrire le json dans le fichier (cf support de cours "Travailler avec des fichiers dans le php impératif)
