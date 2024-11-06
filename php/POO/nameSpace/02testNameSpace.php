<?php
include_once('01testNameSpace.php');

function myFunction()
{
  echo "myFunction dans l'espace de nom global" . PHP_EOL;
}
// appel de myFunction de l'espace de nom global
//myFunction();

// appel de myFunction de l'espace de nom Diginamic
//Diginamic\myFunction();
