<?php
/**
 * File: UserController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Jul 29, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller
{
    public function indexAction()
    {
        return $this->render('BikerBackendBundle:User:index.html.twig');
    }
}
