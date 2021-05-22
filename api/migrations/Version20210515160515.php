<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210515160515 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE game_day_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE game_day (id INT NOT NULL, number INT NOT NULL, date DATE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE participation (player_id INT NOT NULL, game_day_id INT NOT NULL, team_number INT DEFAULT NULL, PRIMARY KEY(player_id, game_day_id))');
        $this->addSql('CREATE INDEX IDX_AB55E24F99E6F5DF ON participation (player_id)');
        $this->addSql('CREATE INDEX IDX_AB55E24F74F7ECEE ON participation (game_day_id)');
        $this->addSql('CREATE INDEX IDX_AB55E24FE08B588D ON participation (team_number)');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24F99E6F5DF FOREIGN KEY (player_id) REFERENCES player (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24F74F7ECEE FOREIGN KEY (game_day_id) REFERENCES game_day (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24FE08B588D FOREIGN KEY (team_number) REFERENCES team (number) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE participation DROP CONSTRAINT FK_AB55E24F74F7ECEE');
        $this->addSql('DROP SEQUENCE game_day_id_seq CASCADE');
        $this->addSql('DROP TABLE game_day');
        $this->addSql('DROP TABLE participation');
    }
}
