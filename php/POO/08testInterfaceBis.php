<?php

class Engine
{
  // Déclaration de l'attribut $name

  public function __construct(private string $name) {}
  public function start()
  {
    echo "Je démarre avec le moteur " . $this->name;
  }
  public function stop()
  {
    echo "Je stoppe le moteur " . $this->name;
  }
}

class Car
{
  public Engine $engine;
  public function __construct()
  {
    $this->engine = new Engine("V8");
  }
}
