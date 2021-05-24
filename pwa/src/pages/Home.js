import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

export default () =>
(
        <Card>
            <Title>Gestion des brulages</Title>
            <CardContent>C'est ici que l'on gère la liste des joueurs qui jouent dans les équipes</CardContent>
        </Card>
);