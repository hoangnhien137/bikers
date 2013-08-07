<?php
/**
 * File: AjaxController.php
 * @author: Hoang Nhien <hoangnhien137@gmail.com>
 * Date: Aug 3, 2013
 */
namespace Biker\BackendBundle\Controller;

use HNcms\UserBundle\Entity\User;

use Biker\CmsBundle\Entity\Menu;
use Biker\CmsBundle\Entity\Item;
use Biker\CmsBundle\Entity\Customer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AjaxController extends Controller
{
    public function indexAction() {
    	$action = $this->get('request')->get('_action');
    	return $this->$action();
    }
    private function _ajaxResponse($bStatus = true, $aData = null, $sMessage = ''){
    	$aResponse = array(
    			'status' => $bStatus,
    			'data' => $aData,
    			'message' => $sMessage
    			);
    	return new Response(json_encode($aResponse));
    }
    protected function addNewMenu() {
    	$user = $this->container->get('security.context')->getToken()->getUser();
		$iBranchId = $user->getBranch();
		if( !empty($iBranchId) ){
			$sMenu = $this->get('request')->get('_menu');
			$oMenu = new Menu();
			$oMenu->setName($sMenu);
			$oMenu->setBranch($iBranchId);
			
			$em = $this->getDoctrine()->getManager();
			$em->persist($oMenu);
			$em->flush();
			$returnData = array(
					'id' => $oMenu->getId(),
					'name' => $oMenu->getName()
					);
			return $this->_ajaxResponse(true, $returnData, 'Added menu id '. $oMenu->getId());
		} else {
			return $this->_ajaxResponse(false, null, 'Missing Branch ID'); 
		}	
    }
    protected function removeMenu() {
    	$iMenuId = $this->get('request')->get('iMenuId');
    	$em = $this->getDoctrine()->getManager();
    	$oMenu = $em->getRepository('BikerCmsBundle:Menu')
    	->find($iMenuId);
    	if(empty($oMenu)){
    		return $this->_ajaxResponse(false, null, 'Menu Not Found !');
    	}
    	$em->remove($oMenu);
    	$em->flush();
    	return $this->_ajaxResponse(true, null, 'Menu is removed');
    }
    
    protected function addItem() {
    	$iMenuId = $this->get('request')->get('_menuid');
    	if(empty($iMenuId)){
    		return $this->_ajaxResponse(false, null, 'Missing Menu Id !');
    	}
    	$em = $this->getDoctrine()->getManager();
    	$oMenu = $em->getRepository('BikerCmsBundle:Menu')
    	->find($iMenuId);
    	
    	if(!empty($oMenu)){
    		$sItemName = $this->get('request')->get('_itemname');
    		$oItem = new Item();
    		$oItem->setName($sItemName);
    		$oItem->setMenu($oMenu);
    		
    		$em->persist($oItem);
    		$em->flush();
    		$returnData = array(
    				'id' => $oItem->getId(),
    				'name' => $oItem->getName()
    		);
    		return $this->_ajaxResponse(true, $returnData, 'Added item id '. $oItem->getId());
    	}
    	return $this->_ajaxResponse(false, null, 'Missing Menu Id !');
    }
    
    protected function deleteItem() {
    	$iItemId = $this->get('request')->get('iItemId');
    	$em = $this->getDoctrine()->getManager();
    	$oItem = $em->getRepository('BikerCmsBundle:Item')
    	->find($iItemId);
    	if(empty($oItem)){
    		return $this->_ajaxResponse(false, null, 'Item Not Found !');
    	}
    	$em->remove($oItem);
    	$em->flush();
    	return $this->_ajaxResponse(true, null, 'Item is removed');
    }
    
    protected function addUser() {
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	$iBranchId = $user->getBranch();
    	if(empty($iBranchId)){
    		return $this->_ajaxResponse(false,null,'Empty Branch Id !');
    	}
    	$em = $this->getDoctrine()->getManager();
    	$oBranch = $em->getRepository('BikerCmsBundle:Branch')
    	->find($iBranchId);
    	if(empty($oBranch)){
    		return $this->_ajaxResponse(false,null,'Empty Branch !');
    	}
    	$sUserName = $this->get('request')->get('_username');
    	$sEmail = $this->get('request')->get('_email');
    	$sPassword = $this->get('request')->get('_password');
    	$sRole = $this->get('request')->get('_role');
    	if($sRole == 'ROLE_BRANCH_MANAGER' || $sRole == 'ROLE_PERSONEL' || $sRole == 'ROLE_THIRD_PARTY') {
    		$userManager = $this->get('fos_user.user_manager');
    		$oUser = $userManager->findUserByEmail($sEmail);
    		if(!empty($oUser)){
    			return $this->_ajaxResponse(true, null, 'User existed !');
    		} else {
    			$oUser = $userManager->createUser();
    			$oUser->setUsername($sUserName);
    			$oUser->setEmail($sEmail);
    			$oUser->setPlainPassword($sPassword);
    			$oUser->setEnabled(true);
    			$oUser->addRole($sRole);
    			$oUser->setBranch($oBranch);
    			$userManager->updateUser($oUser);
    			
    			$sHighestRole = $oUser->getHighestRole();
    			
    			$returnData = array(
    			 'id' => $oUser->getId(),
    					'username' => $oUser->getUsername(),
    					'email' => $oUser->getEmail(),
    					'highestrole' => $sHighestRole
    			);
 
    			return $this->_ajaxResponse(true, $returnData, 'User is created !');
    		}
    	}
    	return $this->_ajaxResponse(false, null, 'False to add new user !');
    }
    
    protected function deleteUser() {
    	$iUserId = $this->get('request')->get('iUserId');
    	$em = $this->getDoctrine()->getManager();
    	$oUser = $em->getRepository('HNcmsUserBundle:User')
    	->find($iUserId);
    	if(empty($oUser)){
    		return $this->_ajaxResponse(false, null, 'User Not Found !');
    	}
    	$em->remove($oUser);
    	$em->flush();
    	return $this->_ajaxResponse(true, null, 'User is removed');
    }
    
    protected function addCustomer() {
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	$iBranchId = $user->getBranch();
    	if(empty($iBranchId)){
    		return $this->_ajaxResponse(false,null,'Empty Branch Id !');
    	}
    	$em = $this->getDoctrine()->getManager();
    	$oBranch = $em->getRepository('BikerCmsBundle:Branch')
    	->find($iBranchId);
    	if(empty($oBranch)){
    		return $this->_ajaxResponse(false,null,'Empty Branch !');
    	}
    	$sUserName = $this->get('request')->get('_username');
    	$sEmail = $this->get('request')->get('_email');
    	$sPassword = $this->get('request')->get('_password');
    	
    	$oCustomer = $em->getRepository('BikerCmsBundle:Customer')
    	->findOneBy(array('email' => $sEmail));
    	
    	if(!empty($oCustomer)){
    		return $this->_ajaxResponse(false, null, 'Customer existed !');
    	} else {
    		$oCustomer = new Customer();
    		$oCustomer->setUsername($sUserName);
    		$oCustomer->setEmail($sEmail);
    		$oCustomer->setPassword($sPassword);
    		$oCustomer->setBranch($oBranch);

    		$em->persist($oCustomer);
    		$em->flush();
    		 
    		$returnData = array(
    				'id' => $oCustomer->getId(),
    				'username' => $oCustomer->getUsername(),
    				'email' => $oCustomer->getEmail(),
    		);
    
    		return $this->_ajaxResponse(true, $returnData, 'Customer is created !');
    	}
    	
    	return $this->_ajaxResponse(false, null, 'false to add new customer');
    }
    
    protected function deleteCustomer() {
    	$iCustomerId = $this->get('request')->get('iCustomerId');
    	$em = $this->getDoctrine()->getManager();
    	$oCustomer = $em->getRepository('BikerCmsBundle:Customer')
    	->find($iCustomerId);
    	if(empty($oCustomer)){
    		return $this->_ajaxResponse(false, null, 'Customer Not Found !');
    	}
    	$em->remove($oCustomer);
    	$em->flush();
    	return $this->_ajaxResponse(true, null, 'Customer is removed');
    }
    
}
