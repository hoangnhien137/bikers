<?php
/**
 * File: CouponsController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Aug 1, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CouponsController extends Controller
{
    public function indexAction()
    {
        return $this->render('BikerBackendBundle:Coupons:index.html.twig');
    }
}
