
import React from 'react';

import { 
    CircularProgress,
    List,
    ListItem,
    Chip,
    InputBase,
    Box
} from '@material-ui/core'
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import {
    Droppable,
    Draggable
} from 'react-beautiful-dnd'

const axios = require('axios');


const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    title: {
        display: 'block'
    },
    listContainer: {
        width: '100%',
        overflowY: 'auto',
        maxHeight: "600px",
        border: `2px solid ${theme.palette.primary.main}`,
        boxSizing: 'border-box',
        borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    },
    listItem: {

    },
    listItemClone: {
        "& ~ li": {
            //display: "none!important"
            transform: "none!important"
        }
    },
    searchBar: {
        width: "100%",
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
    }
});

class PlayerList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            players: [],
            isLoaded: false,
            error: null,
            playerFilter: ""
        }
        this.updateFilter = this.updateFilter.bind(this);
    }

    updateFilter(event) {
        this.setState({
            playerFilter: event.target.value
        });
    }

    componentDidMount() {
        axios.get("/players?itemsPerPage=1000").then((result) => {
            this.setState({
                players: result.data["hydra:member"],
                isLoaded: true
            });
        }).catch((error) => {
            this.setState({
                error: "Error loading player list"
            });
        });
    }

    render()
    {
        let playerContent = null;

        if(this.state.error)
        {
            <p>this.state.error</p>
        }
        else if(!this.state.isLoaded)
        {
            playerContent = <CircularProgress />;
        }
        else 
        {
            playerContent = this.state.players.filter((player) => {
                if(this.state.playerFilter == "")
                {
                    return true;
                }
                else
                {
                    if(player.firstname.toLowerCase().startsWith(this.state.playerFilter.toLowerCase())
                        || player.lastname.toLowerCase().startsWith(this.state.playerFilter.toLowerCase()))
                    {
                        return true;
                    }

                    return false;
                }
            }).map((player, index) => {
                return (
                    <Draggable draggableId={player.licenceNum} key={player.licenceNum} index={index}>
                            {(provided, snapshot) =>(
                                <>
                                    <ListItem className={this.props.classes.listItem} ref={provided.innerRef} 
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={
                                                        provided.draggableProps.style
                                                    }
                                                key={player.licenceNum}>
                                        <Chip color="primary" label={player.firstname + " " + player.lastname}/>
                                    </ListItem>
                                    {snapshot.isDragging && (
                                        <ListItem className={this.props.classes.listItemClone}>
                                                <Chip  color="primary" label={player.firstname + " " + player.lastname}/>
                                        </ListItem>
                                    )}
                                </>
                            )}
                    </Draggable>)
            });
        }
        return (
            <>
                <Box className={this.props.classes.searchBar + " MuiAppBar-colorPrimary"}>
                    <div className={this.props.classes.search}>
                        <div className={this.props.classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase classes={{
                            root: this.props.classes.inputRoot,
                            input: this.props.classes.inputInput
                        }}
                        placeholder="Filtrer"
                        onChange={this.updateFilter} />
                    </div>
                </Box>
                <div className={"MuiPaper-elevation2 " + this.props.classes.listContainer}>
                    <Droppable droppableId="PlayerList" isDropDisabled={true}>
                        {(provided, snapshot) => (
                            <List ref={provided.innerRef}
                                  {...provided.droppableProps}
                            >
                                {playerContent}
                            </List>
                        )}
                    </Droppable>
                </div>
            </>);
    }
}

export default withStyles(styles)(PlayerList);