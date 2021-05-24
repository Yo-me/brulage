import React from 'react'

import {
    Menu,
    MenuItem,
    Button,
    Link
} from '@material-ui/core';

class AppMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            anchorEl: null,
            elements: props.elements,
            title: props.title,
            isLoaded: false,
            error: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidUpdate(newProps) {
        if(newProps.elements.length != this.state.elements.length
            || (newProps.elements.length > 0 && newProps.elements[0].text != this.state.elements[0].text))
        {
            this.setState({
                elements: newProps.elements
            });
        }
    }
  
    handleClick (event) {
      this.setState({
          anchorEl: event.currentTarget
      });
    }
  
    handleClose() {
        this.setState({
            anchorEl: null
        });
    };

    menuClick = event => {
        this.handleClose();
        console.log(event.currentTarget.dataset.link);
    }

    render()
    {
        return (
          <div>
            <Button onClick={this.handleClick} color="inherit">
                {this.state.title}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
                {this.state.elements.map((element) => {
                    return <MenuItem component="a" href={element.link} key={element.text} data-link={element.link} onClick={this.menuClick}>{element.text}</MenuItem>;
                })}
            </Menu>
          </div>
        );
    }
}

export default AppMenu;