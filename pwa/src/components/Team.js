import React from 'react'

import {
    Grid,
    Card,
    CardHeader,
} from '@material-ui/core'

const axios = require('axios');

export class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gamedaysLoaded: false,
            gamedays: [],
            error: null,
            id: null,
            team: ""
        }

        if(props.team)
        {
            this.setState({
                team: props.team
            });
        }
        else
        {
            this.setState({
                error: "Team component must be given a team"
            });
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
                    <Grid container item direction="row" wrap="wrap" spacing="1">
                        {this.state.gamedays.map((gameday) => {
                            return (
                                <Grid item sm="2">
                                    <Card variant="outlined">
                                        <CardHeader title={"Journée " + gameday.number} subheader={new Date(gameday.date).toLocaleDateString ()}></CardHeader>
                                    </Card>
                                </Grid>);
                        })}
                    </Grid>);
            }
            else
            {
                return <p>Loading</p>;
            }
        }
    }
}