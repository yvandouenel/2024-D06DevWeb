<?php
const ROUTES = [
    "/" => [
        "CONTROLLER" => "HomeController",
        "METHOD" => "index",
        "HTTP_METHODS" => "GET",
    ],
    "/users" => [
        "CONTROLLER" => "UsersController",
        "METHOD" => "index",
        "HTTP_METHODS" => "GET",
    ],
    "/home" => [
        "CONTROLLER" => "HomeController",
        "METHOD" => "home",
        "HTTP_METHODS" => "GET",
    ],
];
