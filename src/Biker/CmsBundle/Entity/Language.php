<?php

namespace Biker\CmsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Language
 *
 * @ORM\Table(name="language")
 * @ORM\Entity
 */
class Language
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="language_code", type="string", length=255)
     */
    private $language_code;

    /**
     * @var boolean
     *
     * @ORM\Column(name="enabled", type="boolean", nullable=true)
     */
    protected $enabled;
    
    public function __construct()
    {
    	$this->enabled = true;
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
     * Set name
     *
     * @param string $name
     * @return Language
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set language_code
     *
     * @param string $languageCode
     * @return Language
     */
    public function setLanguageCode($languageCode)
    {
        $this->language_code = $languageCode;
    
        return $this;
    }

    /**
     * Get language_code
     *
     * @return string 
     */
    public function getLanguageCode()
    {
        return $this->language_code;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled
     * @return Language
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    
        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }
}