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
    "/dynamicalusers" => [
        "CONTROLLER" => "UsersController",
        "METHOD" => "dynamicalUsers",
        "HTTP_METHODS" => "GET",
    ],
    "/api/users" => [
        "CONTROLLER" => "UsersController",
        "METHOD" => "getApiUsers",
        "HTTP_METHODS" => "GET",
    ],
    "/user" => [
        "CONTROLLER" => "UsersController",
        "METHOD" => "showUser",
        "HTTP_METHODS" => "GET",
    ],
    "/home" => [
        "CONTROLLER" => "HomeController",
        "METHOD" => "home",
        "HTTP_METHODS" => "GET",
    ],
];
