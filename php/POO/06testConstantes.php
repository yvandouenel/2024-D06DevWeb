<?php
class A
{
  final const NOMBRE = 1;
}


class B extends A
{
  //const NOMBRE = 2;
}

class C
{
  const NOMBRE = 2;
}

echo A::NOMBRE . PHP_EOL;
echo C::NOMBRE;
