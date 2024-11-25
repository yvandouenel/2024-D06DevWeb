<?php

echo "Donner un nom : ";
$nom = trim(fgets(STDIN));

echo "Donner un age : " . PHP_EOL;
$age = trim(fgets(STDIN));

echo "Donner un email : " . PHP_EOL;
$email = trim(fgets(STDIN));

// Gestion des fichiers 
$resource = fopen('./files/users.txt', 'a');
$writed = fwrite($resource, $nom . ',' . $age . ',' . $email . ';' . PHP_EOL);
if ($writed) {
  'Fichier créé et écrit' . PHP_EOL;
  printf("Fichier écrit avec %d octets", $writed . PHP_EOL);
} else {
  'Echec de l\'écriture du fichier';
}

fclose($resource);

// Lecture du fichier
if (file_exists('./files/users.txt')) {
  $resource = fopen('./files/users.txt', 'r');
  while ($data = fgets($resource)) {
    echo PHP_EOL . $data;
  }
} else {
  echo "Le fichier n'existe pas";
}
