import React from 'react'
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import {FaBuffer,FaSearch, FaSun, FaMoon, Fa} from 'react-icons/fa';
import coin from 'cryptocurrency-icons/svg/color/generic.svg'
import {Link, withRouter} from 'react-router-dom'
import setThemeAction from '../actions/Theme'
import {connect} from 'react-redux'


const style = {

    //color: "white",
    //backgroundColor: "black",
    fontSize: "medium",
    marginRight: '1em'
    
}






const Header = (props) => {

  const ThemeButton = withStyles(theme => ({
    root: {
      color: props.txtColor,
      backgroundColor: props.color[500],
      '&:hover': {
        backgroundColor: props.color[700],
      },
    },
  }))(Button, Typography);

  const ThemeSwitch = withStyles({

    
    switchBase: {
      color: grey[50],
      '&$checked': {
        color: grey[300],
      },
      '&$checked + $track': {
        backgroundColor: grey[300],
      },
    },
    checked: {
      color: grey[50],
      '&$checked': {
        color: grey[300],
      },
      '&$checked + $track': {
        backgroundColor: grey[300],
      },
      
  
    },
    track: {},
  })(Switch);
  


  const theme = {
  
  backgroundColor: props.color, 
  textColor: props.txtColor
  
  }


   console.log(props, "PROS DE HEADERS")
    return (
      <>
      <AppBar position="static" style={theme}>
        <Toolbar>
          <IconButton edge="start" className="nn" color="inherit" aria-label="menu" onClick={() => props.history.push('/')}>
            <FaBuffer color={props.color}/>
          </IconButton>
          <ThemeButton>
            CryptoCenter
          </ThemeButton>
          <Nav className="ml-auto">
          <ThemeButton  style={theme} onClick={() => props.history.push('/news')}>News</ThemeButton>
          <ThemeButton  href="" style={theme} onClick={() => props.history.push('/charts')}>Charts</ThemeButton>
          
          <ThemeButton  href="#pricing" style={theme}>Wallet</ThemeButton>
          <ThemeButton  href="#pricing" style={theme}>Explorer</ThemeButton>
          <ThemeButton  href="#pricing" style={theme}>CoinChange</ThemeButton>
        </Nav>
        
          
              <FaSearch />
          
              <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <ThemeButton  href="#pricing" style={theme}>Search</ThemeButton>
          <FaSun color={props.color}/>
          <ThemeSwitch onClick={() => props.setThemeAction(props.color === 'black' ? 'whitesmoke' : 'black' )}
          />
          <FaMoon style={{color: props.color}}/>
          
        </Form>  

          
        </Toolbar>
      </AppBar>
      
      </>
    );
}

const mapDispatchToProps = dispatch => ({
  setThemeAction: (payload) => dispatch(setThemeAction(payload))
});

const mapStateToProps = state => {
  return { color: state.themeReducer.theme.color,
           txtColor: state.themeReducer.theme.textColor,
            };
};




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
