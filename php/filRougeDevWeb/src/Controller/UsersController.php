<?php

namespace Sthom\App\Controller;

use Sthom\App\Model\User;
use Sthom\Kernel\Utils\AbstractController;
use Sthom\Kernel\Utils\Repository;

class UsersController extends AbstractController
{
    public final function index(): void
    {
        $userRepo = new Repository(User::class);
        $users = $userRepo->customQuery('SELECT * FROM user');

        /* $users = $userRepo->getAll();
        dd($users); */
        $this->render('home/users.php', ["users" => $users]);
    }
    /**
     * Va chercher en base de données l'utilisateur dont l'id correspond à la valeur donnée en première valeur de la query string
     * ! C'est l'ordre des paramètres de la query string qui compte (peut importe la clé)
     * Sinon, on peut utiliser le $_GET pour utiliser les clés de la query string
     */
    public final function showUser(int $id): void
    {
        $userRepo = new Repository(User::class);
        $user = $userRepo->customQuery('SELECT * FROM user where user.id=:id', ["id" => $id]);

        $this->render('home/user.php', ["user" => $user]);
    }
    // Le paramètres de $_GET peuvent etre récupérés via les paramètres de la méthode. Attention
}
