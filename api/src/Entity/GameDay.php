<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity
 */
class GameDay
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $number;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity="Participation", mappedBy="gameDay")
     */
    private $participations;

    public function __construct()
    {
        $this->participations = new ArrayCollection();
    }
    
    public function getId(): int
    {
        return $this->id;
    }

    public function getNumber(): int
    {
        return $this->number;
    }

    public function setNumber(string $number) : self
    {
        $this->number = $number;

        return $this;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date) : self
    {
        $this->date = $date;

        return $this;
    }

    public function getParticipations()
    {
        return $this->participations;
    }

}
