<?php

namespace Tecken;

include_once('01testNameSpace.php');
include_once('02testNameSpace.php');


function myFunction()
{
  echo "myFunction dans l'espace de nom tecken" . PHP_EOL;
}
// appel de myFunction de l'espace de nom Tecken
myFunction();

// appel de myFunction de l'espace de nom Diginamic
\Diginamic\myFunction();

// appel de myFunction de l'espace global
\myFunction();
