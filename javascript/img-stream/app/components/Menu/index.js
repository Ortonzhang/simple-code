import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

export default class Menus extends Component{

  constructor(props){
    super(props)
    this.state = {
      anchorEl: null
    }
  }


  click = (path) => {
    this.props.history.location.pathname !== path && this.props.history.push({pathname: path})
    this.handleClose()
  }

  handleClick = () => {
    this.setState({ anchorEl: event.currentTarget });
  }
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render(){
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return(
      <div style={this.props.style}>
        <IconButton onClick={this.handleClick}>
          <MenuIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={()=>this.click('/paset')} >
            paset
          </MenuItem>
          <MenuItem onClick={()=>this.click('/')}>
            Drap && drop
          </MenuItem>
        </Menu>
      </div>
    )
  }

}