import React from "react"
import {
    Card,
    CardHeader,
    CardContent,
    Grid
} from '@material-ui/core';


import {
    Team
} from "../components/Team";

import {
    DragDropContext
} from 'react-beautiful-dnd'

const axios = require('axios');

export class Home extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            isLoaded: false,
            teams: [],
            error: null
        };
    }

    componentDidMount() {
        axios.get("/teams").then((result) => {
            this.setState({
                isLoaded: true,
                teams: result.data["hydra:member"]
            });
        }).catch((error) => {
            this.setState({
                error: "Error loading team list"
            });
        });
    }
    
    render()
    {
        if(this.state.error != null)
        {
            return (
                <Card>
                    <CardContent>{this.state.error}</CardContent>
                </Card>
            );
        }
        else {
            if(this.state.isLoaded)
            {
                return (
                    <Card>
                        <CardContent>
                            <DragDropContext onDragEnd={(param) => {}}>
                                <Grid container spacing={2} direction="column">
                                    {this.state.teams.map((team) => {
                                        return(
                                            <Grid item>
                                                <Card>
                                                    <CardHeader title={"Equipe " + team.number} subheader={team.division.name}/>
                                                    <CardContent>
                                                        <Team team={team} />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </DragDropContext>
                        </CardContent>
                    </Card>
                );
            }
            else
            {
                return (
                    <Card>
                        <CardContent>loading</CardContent>
                    </Card>
                );
            }
        }
        
    }
}