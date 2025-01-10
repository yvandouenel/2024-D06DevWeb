<?php

use PHPUnit\Framework\TestCase;
use Diginamic\Test\BankAccount;

use function PHPUnit\Framework\assertSame;

class BankAccountTest extends TestCase
{

  protected function setUp(): void
  {
    BankAccount::setBalance(0);
  }
  public function testDepositIsConvertedInFloat2()
  {
    $this->assertSame(20.00, BankAccount::deposit(20));
  }
  public function testDepositShouldThrowExceptionIfBalanceNegative()
  {
    // On s'attend à une erreur
    $this->expectException(Exception::class);
    BankAccount::deposit(-20);
  }
  public function testWithDrawShouldThrowExceptionIfBalanceBecomesNegative()
  {
    //$this->assertSame(20.00, BankAccount::widthDraw(20));
    // On s'attend à une erreur car BankAccount::widthDraw(20) n'est pas possible sur un compte à 0
    $this->expectException(Exception::class);
    BankAccount::widthDraw(20);
  }
}
