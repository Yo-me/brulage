<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use App\Entity\Player;
use Doctrine\ORM\EntityManagerInterface;

class PlayerController extends AbstractController
{
    /**
     * @Route("/importPlayers", name="app_lucky_number")
     */
    function importPlayers()
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
            $entityManager = $this->getDoctrine()->getManager();
            $entityRepository = $entityManager->getRepository(Player::class);

            $players = new \SimpleXMLElement($response->getContent());
            $response_text = "";
            foreach($players->joueur as $player)
            {
                $p = $entityRepository->findByLicenceNum($player->licence);

                if(\count($p) == 0)
                {
                    $newPlayer = new Player();
                    $newPlayer->setFirstname($player->prenom);
                    $newPlayer->setLastname($player->nom);
                    $newPlayer->setLicenceNum($player->licence);

                    $entityManager->persist($newPlayer);
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
}
?>