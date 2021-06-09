import React from 'react'

import {
    Grid,
    Card,
    CardHeader,
    CircularProgress,
    Container
} from '@material-ui/core'

import { Gameday } from "./Gameday"

const axios = require('axios');

export class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gamedaysLoaded: false,
            gamedays: [],
            error: null,
            id: null,
            team: props.team
        }
    }

    componentDidMount() {
        axios.get("/game_days").then( (result) => {
            this.setState({
                gamedaysLoaded: true,
                gamedays: result.data["hydra:member"]
            });
        }).catch( (error) => {
            this.setState({
                error: "Error loading gamedays"
            });
        });
    }

    render() {
        if(this.state.error)
        {
            return <p>this.state.error</p>;
        }
        else {
            if(this.state.gamedaysLoaded)
            {
                return (
                    <Grid container direction="row" wrap="wrap" spacing={1} alignItems="stretch" >
                        {this.state.gamedays.map((gameday) => {
                            return (
                                <Grid item key={gameday.id} xs={2}>
                                    <Gameday  gameday={gameday} team={this.state.team}/>
                                </Grid>);
                        })}
                    </Grid>);
            }
            else
            {
                return (
                    <Grid container direction="row" wrap="wrap" spacing={1}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                );
            }
        }
    }
}