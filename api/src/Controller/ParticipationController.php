<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

use App\Entity\Participation;
use Doctrine\ORM\EntityManagerInterface;

class ParticipationController extends AbstractController
{
    public function __invoke(SerializerInterface $serializer, $teamId, $gamedayId)
    {
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityRepository = $entityManager->getRepository(Participation::class);
        
        $participations = $entityRepository->findByTeamAndGameday($teamId, $gamedayId);

        //$controllerResponse = new Response(
        //    $serializer->serialize($participations, 'json'),
        //    Response::HTTP_OK,
        //    ['content-type' => 'appication/json']
        //);

        return $participations;
    }

    /*
    function importParticipations()
    {
        $client = HttpClient::create();
        $currentDate = new \DateTime('now');
        $timestamp = $currentDate->format("YmdHisu");
        $hashedPwd =  "c3d903a40588bd0c6a69a34d59a8aaba";
        $id = "SW111";
        $serial = "test";
        $hashedTimestamp = hash_hmac("sha1", $timestamp, $hashedPwd);

        $response = $client->request('GET', 'http://www.fftt.com/mobile/pxml/xml_liste_joueur_o.php', [
            'query' => [
                'serie' => $serial,
                'tm' => $timestamp,
                'tmc' => $hashedTimestamp,
                'id' => $id,
                'club' => "10330050"
            ] 
        ]);

        $statusCode = $response->getStatusCode();

        if($statusCode == 200)
        {
            //echo($response->getContent());
            $entityManager = $this->getDoctrine()->getManager();
            $entityRepository = $entityManager->getRepository(Participation::class);

            $participations = new \SimpleXMLElement($response->getContent());
            $response_text = "";
            //$response_text = $participations->joueur[0]->asXML();
            foreach($participations->joueur as $participation)
            {
                $p = $entityRepository->findByLicenceNum($participation->licence);

                if(\count($p) == 0)
                {
                    $newParticipation = new Participation();
                    $newParticipation->setFirstname($participation->prenom);
                    $newParticipation->setLastname($participation->nom);
                    $newParticipation->setLicenceNum($participation->licence);

                    $entityManager->persist($newParticipation);
                }
            }
            $entityManager->flush();
            $controllerResponse = new Response(
                $response_text,
                Response::HTTP_OK,
                ['content-type' => 'text/html']
            );

            return $controllerResponse; 
        }
        else
        {
            new Response(
                '<p>An error occured</p>',
                Response::HTTP_INTERNAL_ERROR,
                ['content-type' => 'text/html']
            );
        }
    }
    */
}
?>