<?php

namespace HNcms\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="fos_user")
 * @ORM\Entity
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Biker\CmsBundle\Entity\Branch", inversedBy="users")
     * @ORM\JoinColumn(name="branch_id", referencedColumnName="id")
     */
    private $branch;

	public function __construct()
	{
		parent::__construct();
		// your own logic
	}

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * Set branch
     *
     * @param \Biker\CmsBundle\Entity\Branch $branch
     * @return User
     */
    public function setBranch(\Biker\CmsBundle\Entity\Branch $branch = null)
    {
        $this->branch = $branch;
    
        return $this;
    }

    /**
     * Get branch
     *
     * @return \Biker\CmsBundle\Entity\Branch 
     */
    public function getBranch()
    {
        return $this->branch;
    }
    
    /**
     * Get highest role
     *
     * @return string
     */
    public function getHighestRole()
    {
    	$aRoles = $this->roles;
    	$sHighestRole = '';
    	if(in_array('ROLE_ADMIN', $aRoles)){
    		$sHighestRole = 'Admin';
    	} elseif( in_array('ROLE_BRANCH_MANAGER', $aRoles) ){
    		$sHighestRole = 'Branch Manager';
    	} elseif( in_array('ROLE_PERSONEL', $aRoles)){
    		$sHighestRole = 'Personel';
    	} elseif( in_array('ROLE_THIRD_PARTY', $aRoles)){
    		$sHighestRole = 'Third Party';
    	} 
    	return $sHighestRole;
    }
}