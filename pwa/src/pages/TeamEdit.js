import React from 'react'

import { withRouter } from 'react-router-dom';
import { 
    Grid,
    CircularProgress,
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core'

import {
    DragDropContext
} from 'react-beautiful-dnd'

import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import {Team} from '../components/Team';
import PlayerList from '../components/PlayerList';
const axios = require('axios');

class TeamEdit extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            arePlayersLoaded: false,
            players: [],
            isTeamLoaded: false,
            team: null,
            error: null,
            playerFilter: ""
        };
    }

    componentDidMount() {
        axios.get("/teams/" + this.props.match.params.teamNum).then((result) => {
            this.setState({
                team: result.data,
                isTeamLoaded: true
            });
        }).catch((error) => {
            this.setState({
                error: "Error loading team data"
            });
        });
    }

    onDragEnd = (result) => {
        const { source, destination } = result;
        
        if (!destination) {
            return;
        }
        // the only one that is required
    };

    onDragStart = (result) => {
        console.log("drag started");
    }

    onDragUpdate = (result) => {
        console.log("grad updated");
    }

    render()
    {
        
        let teamContent = null;
        let titleContent = null;

        if(this.state.error)
        {

        }
        else if(!this.state.isTeamLoaded)
        {
            teamContent = <CircularProgress />;
            titleContent = <p></p>;
        }
        else
        {
            titleContent = <CardHeader subheaderTypographyProps={{variant: "h6"}} titleTypographyProps={{variant: "h4"}} title={"Equipe " + this.state.team.number} subheader={this.state.team.division.name} />;
            teamContent = <Team team={this.state.team} />;
        }
        
        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
                <Card>
                    {titleContent}
                    <CardContent>
                        <Grid container direction="row" wrap="nowrap" alignItems="stretch" style={{height:"100%", padding:"8px"}} spacing={4}>
                            <Grid item xs={2}>
                                <PlayerList />
                            </Grid>
                            <Grid item xs>
                                {teamContent}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DragDropContext>
        );
    }
}

export default withRouter(TeamEdit);