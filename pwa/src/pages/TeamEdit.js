import React from 'react'

import { withRouter } from 'react-router-dom';
import { 
    Grid,
    CircularProgress,
    List,
    ListItem,
    Chip,
    Card,
    CardContent,
    CardHeader,
    AppBar,
    Toolbar,
    InputBase,
    Typography,
    Box
} from '@material-ui/core'
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import {Team} from '../components/Team';

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
    searchBar: {
        width: "100%",
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
    }
});

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

        this.updateFilter = this.updateFilter.bind(this);
    }

    componentDidMount() {
        axios.get("/players?itemsPerPage=1000").then((result) => {
            this.setState({
                players: result.data["hydra:member"],
                arePlayersLoaded: true
            });
        }).catch((error) => {
            this.setState({
                error: "Error loading player list"
            });
        });

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

    updateFilter(event) {
        this.setState({
            playerFilter: event.target.value
        });
    }

    render()
    {
        let playerContent = null;
        let teamContent = null;
        let titleContent = null;
        if(this.state.error)
        {
            <p>this.state.error</p>
        }
        else if(!this.state.arePlayersLoaded)
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
            }).map((player) => {
                return (
                    <ListItem key={player.licenceNum}>
                        <Chip color="primary" label={player.firstname + " " + player.lastname}/>
                    </ListItem>)
            });
        }

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
            <Card>
                {titleContent}
                <CardContent>
                    <Grid container direction="row" wrap="nowrap" alignItems="stretch" style={{height:"100%", padding:"8px"}} spacing={4}>
                        <Grid item xs={2}>
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
                                    <List>
                                        {playerContent}
                                    </List>
                                </div>
                        </Grid>
                        <Grid item xs>
                            {teamContent}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(TeamEdit));