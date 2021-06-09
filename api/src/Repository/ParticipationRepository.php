<?php
namespace App\Repository;

use App\Entity\Participation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Query\Parameter;

class ParticipationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Participation::class);
    }

    public function findByTeamAndGameday(string $teamId, string $gamedayId)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\Participation p
            WHERE p.team = :team_id AND p.gameDay = :gameday_id'
        )->setParameters(
            new ArrayCollection([
                new Parameter('team_id', $teamId),
                new Parameter('gameday_id', $gamedayId)
            ])
        );

        // returns an array of Participation objects
        return $query->getResult();
    }
}

?>