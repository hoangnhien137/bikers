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
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	$iBranch = $user->getBranch();
    	if(empty($iBranch)){
    		return $this->_errorResponse('Empty Branch');
    	}
    	$em = $this->getDoctrine()->getManager();
    	$aUsers = $em->getRepository('HNcmsUserBundle:User')
    	->findBy(array('branch' => $iBranch));
    	
    	$aCustomers = $em->getRepository('BikerCmsBundle:Customer')
    	->findBy(array('branch' => $iBranch));
    	
        return $this->render('BikerBackendBundle:User:index.html.twig', array(
        		'aUsers' => $aUsers,
        		'aCustomers' => $aCustomers
        		));
    }
    private function _errorResponse($sMessage = 'unknow'){
    	return new Response('Error: ' . $sMessage);
    }
}
