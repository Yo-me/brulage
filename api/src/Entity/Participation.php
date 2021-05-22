<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity
 */
class Participation
{
    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="Player")
     */
    public $player;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="GameDay", inversedBy="participations")
     */
    public $gameDay;

    /**
     * @ORM\ManyToOne(targetEntity="Team")
     * @ORM\JoinColumn(name="team_number", referencedColumnName="number")
     */
    public $team;

}
