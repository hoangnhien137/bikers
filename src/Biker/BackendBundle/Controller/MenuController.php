<?php
/**
 * File: MenuController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Jul 29, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MenuController extends Controller
{
    public function indexAction()
    {
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	$iBranch = $user->getBranch();
    	if(empty($iBranch)){
    		return $this->_errorResponse('Empty Branch');
    	}
    	$em = $this->getDoctrine()->getManager();
    	$aMenu = $em->getRepository('BikerCmsBundle:Menu')
    	->findBy(array('branch' => $iBranch));
    	return $this->render('BikerBackendBundle:Menu:index.html.twig', array(
    			'aMenu' => $aMenu
    			));
    }
    private function _errorResponse($sMessage = 'unknow'){
    	return new Response('Error: ' . $sMessage);
    }
}
