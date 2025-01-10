<?php

use PHPUnit\Framework\TestCase;

class StackSetUpTest extends TestCase
{
  protected $stack;

  protected function setUp(): void
  {
    $this->stack = [];
  }

  protected function tearDown(): void
  {
    $this->stack = [];
  }

  public function testEmpty()
  {
    $this->assertTrue(empty($this->stack));
  }

  public function testPush()
  {
    array_push($this->stack, 'foo');
    $this->assertSame('foo', $this->stack[count($this->stack) - 1]);
    $this->assertFalse(empty($this->stack));
  }

  public function testPop()
  {
    array_push($this->stack, 'foo');
    $this->assertSame('foo', array_pop($this->stack));
    $this->assertTrue(empty($this->stack));
  }
}
