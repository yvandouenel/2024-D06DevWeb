<?php

class MyClass
{
  private $tab = [
    1,
    2,
    3
  ];

  public function getSetTab($value = false)
  {
    $i = 0;
    while (isset($this->tab[$i])) {
      yield "Ancienne valeur: " . $this->tab[$i];
      if ($value) {
        $this->tab[$i] = $value;
        yield "Nouvelle valeur: " . $this->tab[$i];
      }
      $i++;
    }
    return $this;
  }
}

$objet = new MyClass();
$tab = $objet->getSetTab("z");
foreach ($tab as $value) {
  echo "valeur de retour des yield : " . $value . PHP_EOL;
}

/* var_dump($tab->getReturn());  */
