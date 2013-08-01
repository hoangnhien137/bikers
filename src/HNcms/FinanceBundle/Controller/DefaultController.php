<?php

namespace HNcms\FinanceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('HNcmsFinanceBundle:Default:index.html.twig', array('name' => $name));
    }
}
