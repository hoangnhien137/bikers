<?php

namespace Biker\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ApiController extends Controller
{
    public function indexAction()
    {

		$sAction = $this->get('request')->get('action');
		$sActionList = array(
			'login',
		);
		if(in_array($sAction, $sActionList)){
			return $this->$sAction();
		} else {
			return $this->getResponse(false, null, 'Missing action', 200);
		}
    }

	/* RestAPI Function */
	private function getStatusMessage($sStatus){
		$aStatusList = array(
			100 => 'Continue',
			101 => 'Switching Protocols',
			200 => 'OK',
			201 => 'Created',
			202 => 'Accepted',
			203 => 'Non-Authoritative Information',
			204 => 'No Content',
			205 => 'Reset Content',
			206 => 'Partial Content',
			300 => 'Multiple Choices',
			301 => 'Moved Permanently',
			302 => 'Found',
			303 => 'See Other',
			304 => 'Not Modified',
			305 => 'Use Proxy',
			306 => '(Unused)',
			307 => 'Temporary Redirect',
			400 => 'Bad Request',
			401 => 'Unauthorized',
			402 => 'Payment Required',
			403 => 'Forbidden',
			404 => 'Not Found',
			405 => 'Method Not Allowed',
			406 => 'Not Acceptable',
			407 => 'Proxy Authentication Required',
			408 => 'Request Timeout',
			409 => 'Conflict',
			410 => 'Gone',
			411 => 'Length Required',
			412 => 'Precondition Failed',
			413 => 'Request Entity Too Large',
			414 => 'Request-URI Too Long',
			415 => 'Unsupported Media Type',
			416 => 'Requested Range Not Satisfiable',
			417 => 'Expectation Failed',
			500 => 'Internal Server Error',
			501 => 'Not Implemented',
			502 => 'Bad Gateway',
			503 => 'Service Unavailable',
			504 => 'Gateway Timeout',
			505 => 'HTTP Version Not Supported');
		return ($aStatusList[$sStatus])?$aStatusList[$sStatus]:$aStatusList[500];
	}

	private function getResponse($sStatus = true, $aData = null, $sMessage='',$sHeaderStatus = 200 ){
		$this->setHeaders($sHeaderStatus);
		echo json_encode(
			array(
				'status' => $sStatus,
				'message' => $sMessage,
				'data' => $aData
			)
		);
		exit;
	}

	private function setHeaders($sStatus){
		header("HTTP/1.1 ".$sStatus." ".$this->getStatusMessage($sStatus));
		header("Content-Type:application/json");
	}

	private function validateInput($sAction){
		$aRequires = array(
			'login' => array(
				'email',
				'password',
			)
		);

		if(!empty($aRequires[$sAction])){
			foreach($aRequires[$sAction] as $sKey){
				$sInput = $this->get('request')->get($sKey);
				if( empty( $sInput ) ){
					return 'Missing '.$sKey;
				}
			}
			return 1;
		} else{
			return 1;
		}
	}

	protected function login(){
		$sMethod = $this->get('request')->getMethod();

		if($sMethod == 'POST'){
			$sValidate = $this->validateInput('login');

			if($sValidate == 1){
				$em = $this->getDoctrine()->getManager();
				$oCustomer = $em->getRepository('BikerCmsBundle:Customer')
					->findOneBy(array(
						'email' => $this->get('request')->get('email'),
						'password' => md5($this->get('request')->get('password')),
						)
					);
				if(!empty($oCustomer)){
					$this->getResponse(true, null, 'Login Success', 200);
				} else {
					$this->getResponse(false, null, 'Login False', 200);
				}
			} else {
				$this->getResponse(false, null, $sValidate, 200);
			}
		} else {
			$this->getResponse(false, null, 'Wrong Method', 200);
		}
	}
}