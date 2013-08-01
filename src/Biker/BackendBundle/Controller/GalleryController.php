<?php
/**
 * File: GalleryController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Aug 1, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class GalleryController extends Controller
{
    public function indexAction()
    {
        return $this->render('BikerBackendBundle:Gallery:index.html.twig');
    }
}
