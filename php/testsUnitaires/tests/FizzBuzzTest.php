<?php

use PHPUnit\Framework\TestCase;

class FizzBuzzTest extends TestCase
{
  public function testFizzBuzz()
  {
    // assertion
    $this->assertSame(1, $this->FizzBuzz(1));
    $this->assertSame(2, $this->FizzBuzz(2));
    $this->assertSame("Fizz", $this->FizzBuzz(3));
    $this->assertSame("Fizz", $this->FizzBuzz(9));
    $this->assertSame("Buzz", $this->FizzBuzz(5));
    $this->assertSame("FizzBuzz", $this->FizzBuzz(15));
    $this->assertSame("FizzBuzz", $this->FizzBuzz(15));
  }
  private function FizzBuzz($n)
  {
    if ($n % 3 === 0 && $n % 5 === 0) {
      return "FizzBuzz";
    } elseif ($n % 3 === 0) {
      return "Fizz";
    } elseif ($n % 5 === 0) {
      return "Buzz";
    }
    return $n;
  }
}
