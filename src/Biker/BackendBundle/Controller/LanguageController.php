<?php
/**
 * File: LanguageController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Aug 1, 2013
 */
namespace Biker\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class LanguageController extends Controller
{
    public function indexAction()
    {
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	// check role super admin
    	$em = $this->getDoctrine()->getManager();
    	$aLanguages = $em->getRepository('BikerCmsBundle:Language')
    	->findAll();
    	 
    	return $this->render('BikerBackendBundle:Language:index.html.twig', array(
    			'aLanguages' => $aLanguages,
    	));
    }
    
    private function _errorResponse($sMessage = 'unknow'){
    	return new Response('Error: ' . $sMessage);
    }
}
