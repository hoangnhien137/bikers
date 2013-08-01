<?php
/**
 * File: MenuController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Jul 29, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MenuController extends Controller
{
    public function indexAction()
    {
        return $this->render('BikerBackendBundle:Menu:index.html.twig');
    }
}
