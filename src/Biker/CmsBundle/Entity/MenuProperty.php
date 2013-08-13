<?php

namespace Biker\CmsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MenuProperty
 *
 * @ORM\Table(name="menu_property")
 * @ORM\Entity
 */
class MenuProperty
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
     * @ORM\ManyToOne(targetEntity="Language")
     * @ORM\JoinColumn(name="language_id", referencedColumnName="id")
     */
    private $language;
    
    /**
     * @ORM\ManyToOne(targetEntity="Menu")
     * @ORM\JoinColumn(name="menu_id", referencedColumnName="id")
     */
    private $menu;

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
     * @return MenuProperty
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
     * Set language
     *
     * @param \Biker\CmsBundle\Entity\Language $language
     * @return MenuProperty
     */
    public function setLanguage(\Biker\CmsBundle\Entity\Language $language = null)
    {
        $this->language = $language;
    
        return $this;
    }

    /**
     * Get language
     *
     * @return \Biker\CmsBundle\Entity\Language 
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set menu
     *
     * @param \Biker\CmsBundle\Entity\Menu $menu
     * @return MenuProperty
     */
    public function setMenu(\Biker\CmsBundle\Entity\Menu $menu = null)
    {
        $this->menu = $menu;
    
        return $this;
    }

    /**
     * Get menu
     *
     * @return \Biker\CmsBundle\Entity\Menu 
     */
    public function getMenu()
    {
        return $this->menu;
    }
}