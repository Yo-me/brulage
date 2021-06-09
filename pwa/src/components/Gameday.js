import React from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Chip
} from '@material-ui/core';


const axios = require('axios');

export class Gameday extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            gameday: props.gameday,
            team: props.team,
            players: null,
            isLoaded: false
        };

        if(props.gameday) {
            this.setState({
                error: ""
            })
        }

    }

    componentDidMount() {
        axios.get("/participations_with_team_and_gameday/" + this.state.team.number + "/" + this.state.gameday.id).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    players: result.data["hydra:member"].map((p) => {
                        return p.player;
                    })
                })
            })
    }

    render() {
        if(this.state.error) {
            return (
                <Grid item sm="2">
                    <Card variant="outlined">
                        <p>{this.state.error}</p>
                    </Card>
                </Grid>
            );
        }
        else {
            let content = null;
            if(!this.state.isLoaded)
            {
                content = (
                    <Grid container justify="center" spacing={0}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                );
            }
            else
            {
                content = (
                    <Grid container direction="column" spacing={1}>
                        {
                            this.state.players.map((player) => {
                                return (
                                    <Grid item key={player.licenceNum}><Chip color="primary" label={player.firstname + " " + player.lastname}/></Grid>
                                );
                            })
                        }
                    </Grid>
                );
            }

            return (
                <Card variant="outlined" style={{height: "100%"}}>
                    <CardHeader title={"Journée " + this.state.gameday.number} subheader={new Date(this.state.gameday.date).toLocaleDateString ()}></CardHeader>
                    <CardContent>
                        {content}
                    </CardContent>
                </Card>
            );
        }
    }

}