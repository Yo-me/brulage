<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ParticipationController;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={
 *              "player_visibility"
 *          }
 *      },
 *      itemOperations={
 *          "get",
 *          "post",
 *          "get_with_team_and_gameday"={
 *              "method"="GET",
 *              "path"="participations_with_team_and_gameday/{teamId}/{gamedayId}",
 *              "controller"=ParticipationController::class,
 *              "read"=false,
 *          }         
 *      })
 * @ORM\Entity(repositoryClass="App\Repository\ParticipationRepository")
 */
class Participation
{
    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="Player")
     * @Groups({"player_visibility"})
     */
    public $player;
    
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="GameDay", inversedBy="participations")
     * @Groups({"player_visibility"})
     */
    public $gameDay;
    
    /**
     * @ORM\ManyToOne(targetEntity="Team")
     * @ORM\JoinColumn(name="team_number", referencedColumnName="number")
     * @Groups({"player_visibility"})
     */
    public $team;

}
