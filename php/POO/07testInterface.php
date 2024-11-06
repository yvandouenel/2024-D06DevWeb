<?php

interface Payment
{
  public function pay(int $montant): void;
  public function refund($montant);
}

class UneBanque implements Payment
{
  public function pay(int $montant): void
  {
    echo 'Je paye avec UneBanque ' . $montant;
  }

  public function refund($montant)
  {
    echo 'Je rembourse avec UneBanque';
  }
}

$myBank = new UneBanque();
$myBank->pay(100);
