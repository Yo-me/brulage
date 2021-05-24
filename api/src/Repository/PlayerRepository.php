<?php
namespace App\Repository;

use App\Entity\Player;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class PlayerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Player::class);
    }

    public function findByLicenceNum(string $licenceNum)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\Player p
            WHERE p.licenceNum LIKE :licenceNum'
        )->setParameter('licenceNum', $licenceNum);

        // returns an array of Player objects
        return $query->getResult();
    }
}

?>