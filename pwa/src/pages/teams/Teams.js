import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const axios = require("axios");

class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            teams: []
        };
    }

    componentDidMount() {
        axios.get("/pouet")
        .then(result => {
            this.setState({
                isLoaded: true,
                teams: result.data["hydra:member"]
            });
            console.log(result);
        })
        .catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    render() {
        
        if(this.state.error)
        {
            return <p>{this.state.error.message}</p>;
        }
        else if(this.state.isLoaded == false)
        {
            return <p>loading</p>
        }
        else if(this.state.isLoaded)
        {
            return (
                <ListGroup horizontal>
                    {this.state.teams.map(team => (
                        <ListGroup.Item>Equipe {team.number}</ListGroup.Item>
                    ))}
                </ListGroup>
            );
        }
        return <p>Teams</p>;
    }
}

export default Teams;