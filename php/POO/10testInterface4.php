<?php

declare(strict_types=1);

interface Banque
{
  public function payer(float $montant): void;
}

class UneBanque implements Banque
{
  public function payer(float $montant): void
  {
    echo 'Je paye avec UneBanque' . PHP_EOL;
  }
}

class AutreBanque implements Banque
{
  public function payer(float $montant): void
  {
    echo 'Je paye avec AutreBanque' . PHP_EOL;
  }
}

class Payer
{
  // Attribut
  static private Banque $banque;

  public static function setPayer(string $type, float $montant): void
  {
    if (class_exists($type)) {
      self::$banque = new $type();
      self::$banque->payer($montant);
    } else {
      echo 'Ce type de paiement n\'existe pas car la classe ' . $type . " n'existe pas" . PHP_EOL;
    }
  }
}

class CreditAgricole implements Banque
{
  public function payer(float $montant): void
  {
    echo 'Je paye avec le Crédit Agricole' . PHP_EOL;
  }
}

Payer::setPayer("UneBanque", 100);

Payer::setPayer("CreditAgricole", 100);

Payer::setPayer("autrebanque", 100);
