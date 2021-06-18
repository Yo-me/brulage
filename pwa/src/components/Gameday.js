import React from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Chip,
    List,
    ListItem
} from '@material-ui/core';

import {
    Droppable,
    Draggable
} from 'react-beautiful-dnd'

import { withStyles } from '@material-ui/core/styles';

const axios = require('axios');

const styles = theme => ({
    hovered: {
        border: `3px solid ${theme.palette.primary.main}`
    }
})

class Gameday extends React.Component {

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
            return (
                <Droppable key={this.props.gameday.id+","+this.props.team.number} droppableId={this.props.gameday.id + "," + this.props.team.number} isDropDisabled={false} >
                    {(provided, snapshot) => (
                        <Card variant="outlined" className={snapshot.isDraggingOver ? this.props.classes.hovered : "" }>
                            <CardHeader title={"Journée " + this.state.gameday.number} subheader={new Date(this.state.gameday.date).toLocaleDateString ()}></CardHeader>
                            <CardContent>
                                {!this.state.isLoaded && (
                                    <Grid container justify="center" spacing={0}>
                                        <Grid item>
                                            <CircularProgress />
                                        </Grid>
                                    </Grid>
                                )}
                                {this.state.isLoaded && (
                                    <List {...provided.droppableProps} 
                                        ref={provided.innerRef} >
                                        {
                                            this.state.players.map((player, index) => {
                                                return (
                                                    <Draggable draggableId={player.licenceNum+"gameday"} index={index} key={player.licenceNum} isDragDisabled={true}>
                                                        {
                                                            (provided, snapshot) => (
                                                                <ListItem ref={provided.innerRef} key={player.licenceNum}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                            style={
                                                                                    provided.draggableProps.style
                                                                                }>
                                                                    <Chip color="primary" label={player.firstname + " " + player.lastname}/>
                                                                </ListItem>                                                        
                                                            )
                                                        }
                                                    </Draggable>
                                                );
                                            })
                                        }
                                        {provided.placeholder}
                                    </List>)}
                            </CardContent>
                        </Card>
                    )}
                </Droppable>
            );
        }
    }

}

export default withStyles(styles)(Gameday);