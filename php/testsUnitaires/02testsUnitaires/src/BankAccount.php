<?php

namespace Diginamic\Test;

use Exception;

class BankAccount
{
  private static float $balance = 0;
  public static function deposit(float $amount): float
  {
    if ($amount < 0) {
      throw new Exception("Impossible de déposer un montant négatif");
    }
    $amount = round($amount, 2);
    self::$balance += $amount;
    return $amount;
  }
  /**
   * Retrait
   */
  public static function widthDraw(float $amount): void
  {
    // Si je veux retirer plus d'argent qu'il n'y en a sur mon compte, je génère une erreur
    if ($amount > self::$balance) {
      throw new Exception("Impossible de retirer : le solde deviendrait négatif");
    }

    $amount = round($amount, 2);
    self::$balance -= $amount;
  }
  /**
   * Solde
   */
  public static function getBalance(): float
  {
    return self::$balance;
  }
  public static function setBalance($amount): void
  {
    self::$balance = $amount;
  }
}
