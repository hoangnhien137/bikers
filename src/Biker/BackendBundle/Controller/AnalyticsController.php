<?php
/**
 * File: AnalyticsController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Aug 1, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AnalyticsController extends Controller
{
    public function indexAction()
    {
        return $this->render('BikerBackendBundle:Analytics:index.html.twig');
    }
}
