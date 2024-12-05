<?php

namespace Sthom\App\Controller;

use Sthom\App\Model\User;
use Sthom\Kernel\Utils\AbstractController;
use Sthom\Kernel\Utils\Repository;

class HomeController extends AbstractController
{
    public final function index(): void
    {
        $userRepo = new Repository(User::class);

        // $user = $userRepo->customQuery('SELECT * FROM user WHERE id = :id', ['id' => 1]);
        //dd($user);
        $this->render('home/index.php');
    }

    // Le paramètres de $_GET peuvent etre récupérés via les paramètres de la méthode. Attention
}
