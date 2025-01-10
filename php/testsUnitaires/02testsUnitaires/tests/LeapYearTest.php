<?php

use PHPUnit\Framework\TestCase;
use Diginamic\Test\LeapYear;

class LeapYearTest extends TestCase
{
  public function testLeapYear1()
  {
    $this->assertSame(false, LeapYear::isLeapYear(1));
  }
  public function testLeapYear4()
  {
    $this->assertSame(true, LeapYear::isLeapYear(4));
  }
  public function testLeapYear100()
  {
    $this->assertSame(false, LeapYear::isLeapYear(100));
  }
  public function testLeapYear400()
  {
    $this->assertSame(true, LeapYear::isLeapYear(400));
  }
  public function testLeapYear2028()
  {
    $this->assertSame(true, LeapYear::isLeapYear(2028));
  }
  public function testLeapYear2200()
  {
    $this->assertSame(false, LeapYear::isLeapYear(2200));
  }
}
