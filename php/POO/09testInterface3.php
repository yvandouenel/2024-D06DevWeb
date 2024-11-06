<?php

// L'interface Engine définit le contrat 
interface EngineInterface
{
  public function start(): void;
  public function stop(): void;
}
// Une implémentation concrète de moteur V8 
class V8Engine implements EngineInterface
{
  public function __construct(private string $name, private string $builder) {}
  public function start(): void
  {
    echo "Je démarre avec le moteur " . $this->name . PHP_EOL;
  }
  public function stop(): void
  {
    echo "J'arrête le moteur " . $this->name;
  }
}
// Une autre implémentation  
class ElectricEngine implements EngineInterface
{
  public function __construct(private string $name) {}
  public function start(): void
  {
    echo "Je démarre silencieusement avec le moteur électrique " . $this->name . PHP_EOL;
  }
  public function stop(): void
  {
    echo "J'arrête le moteur électrique " . $this->name;
  }
}
// La classe Car reçoit maintenant n'importe quel type de moteur qui implémente EngineInterface 
class Car
{
  private EngineInterface $engine;
  public function __construct(EngineInterface $engine)
  {
    $this->engine = $engine;
  }
  public function start(): void
  {
    $this->engine->start();
  }
  public function stop(): void
  {
    $this->engine->stop();
  }
}

// Instanciation d'une voiture avec le moteur V8
$voitureA = new Car(new V8Engine("V8", "Renault"));
$voitureB = new Car(new ElectricEngine("Zoe"));

/* var_dump($voitureA);
var_dump($voitureB); */
$voitureA->start();
$voitureB->start();
