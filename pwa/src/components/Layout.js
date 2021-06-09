import React from 'react'
import { Layout } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import WhatshotRoundedIcon from '@material-ui/icons/WhatshotRounded';

import {
    AppBar,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Button
} from '@material-ui/core';

import AppMenu from "./menu";

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(3),
    },
}));

class TeamsMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            teams: [],
            isLoaded: false,
            error: null
        };
    }
    
    componentDidMount()
    {
        axios.get("/teams").then((result) => {
            this.setState({
                isLoaded: true,
                teams: result.data["hydra:member"] 
            });
        }).catch((error) => {
            this.setState({
                error: true
            });
        })
    }

    render()
    {
        let menuItems = [];

        if(this.state.error)
        {
            return <AppMenu elements={[{ text: "Error loading teams", link: "#/"}]} title="Mes Equipes" />
        }
        else if(this.state.isLoaded == true)
        {
            return <AppMenu 
            elements={this.state.teams.map((team) => {
                return {
                    text: "Equipe " + team.number,
                    link: "#/teamEdit/" + team.number
                };
            })}
            title="Mes Equipes"
            />
        }
        else if(this.state.isLoaded == false)
        {
            return <AppMenu elements={[{text: "loading", link: "#/"}]} title="Mes Equipes" />;
        }
    }
}

export function Bar () {
    const classes = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <WhatshotRoundedIcon fontSize="large"/>
                <TeamsMenu></TeamsMenu>
                <AppMenu title="Admin" elements={[
                    {
                        text: "Joueurs",
                        link: "#/players"
                    },
                    {
                        text: "Divisions",
                        link: "#/divisions"
                    },
                    {
                        text: "Equipes",
                        link: "#/teams"
                    },
                    {
                        text: "Journées",
                        link: "#/game_days"
                    },
                    {
                        text: "Participations",
                        link: "#/participations"
                    }
                ]} />
            </Toolbar>
        </AppBar>
    );
}

export const AppSidebar = props => {
    return (
        <></>
    );
};

export const AppLayout = props => (
    <Layout appBar={Bar} sidebar={AppSidebar} {...props}>
        
        
    </Layout>
);

