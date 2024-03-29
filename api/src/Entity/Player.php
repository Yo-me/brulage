<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PlayerRepository")
 */
class Player
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"player_visibility"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player_visibility"})
     */
    private $firstname;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player_visibility"})
     */
    private $lastname;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player_visibility"})
     */
    private $licenceNum;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getLicenceNum(): ?string
    {
        return $this->licenceNum;
    }

    public function setLicenceNum(string $licenceNum): self
    {
        $this->licenceNum = $licenceNum;

        return $this;
    }
}
