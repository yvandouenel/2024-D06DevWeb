<?php

namespace Diginamic\Test;

class LeapYear
{
  public static function isLeapYear(int $year): bool
  {
    // teste si multiple de 4 mais pas de 100 ou multiple de 400
    if (($year % 4 == 0 && $year % 100 != 0)
      || $year % 400 == 0
    ) {
      return true;
    }
    // Cas général 
    return false;
  }
}
