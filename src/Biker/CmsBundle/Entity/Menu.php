<?php

namespace Biker\CmsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Biker\CmsBundle\Entity\Branch;

/**
 * Menu
 *
 * @ORM\Table(name="menu")
 * @ORM\Entity
 */
class Menu
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
     * @ORM\ManyToOne (targetEntity="Branch", inversedBy="menus")
     * @ORM\JoinColumn(name="branch_id", referencedColumnName="id")
     */
    private $branch;
    
    /**
     * @ORM\OneToMany(targetEntity="Item", mappedBy="menu")
     */
    private $items;

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
     * @return Menu
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
     * Set branch
     *
     * @param \Biker\CmsBundle\Entity\Branch $branch
     * @return Menu
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
     * Constructor
     */
    public function __construct()
    {
        $this->items = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add items
     *
     * @param \Biker\CmsBundle\Entity\Item $items
     * @return Menu
     */
    public function addItem(\Biker\CmsBundle\Entity\Item $items)
    {
        $this->items[] = $items;
    
        return $this;
    }

    /**
     * Remove items
     *
     * @param \Biker\CmsBundle\Entity\Item $items
     */
    public function removeItem(\Biker\CmsBundle\Entity\Item $items)
    {
        $this->items->removeElement($items);
    }

    /**
     * Get items
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getItems()
    {
        return $this->items;
    }
}