<?php
class BankAccount
{
  public function __construct(private float $balance, private int $overdraft = 0) {}


  public function getBalance(): float
  {
    return $this->balance;
  }
  // Déposer de l'argent
  public function deposit($deposit)
  {
    echo "Vous avez déposé $deposit € " . PHP_EOL;
    $this->balance += $deposit;
    return $this;
  }
  // Retirer de l'argent
  public function withDraw($amount)
  {
    if ($amount < $this->balance + $this->overdraft) {
      // on enlève le montant au compte
      $this->balance -= $amount;
    } else {
      echo "Fonds insuffisants";
    }
    return $this;
  }
}

$ba = new BankAccount(1000, 200);
// Je veux retirer de l'argent et afficher le solde
echo $ba->withDraw(300)->getBalance();
