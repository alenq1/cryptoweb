import React, { useState } from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import { IoIosCube, IoIosMoon, IoMdSunny, IoMdSearch } from 'react-icons/io'
import { Link, withRouter } from 'react-router-dom'
import setThemeAction from '../actions/Theme'
import { connect } from 'react-redux'

const style = {
  //color: "white",
  //backgroundColor: "black",
  fontSize: 'medium',
  marginRight: '1em'
}

const Header = props => {


  const [checked, Check] = useState(false)
  const ThemeButton = withStyles(theme => ({
    root: {
      color: props.textColor,
      backgroundColor: props.color[500],
      '&:hover': {
        backgroundColor: props.color[700]
      }
    }
  }))(Button, Typography)

  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[50],
      '&$checked': {
        color: grey[300]
      },
      '&$checked + $track': {
        backgroundColor: grey[300]
      }
    },
    checked: {
      color: grey[50],
      '&$checked': {
        color: grey[300]
      },
      '&$checked + $track': {
        backgroundColor: grey[300]
      }
    },
    track: {}
  })(Switch)

  const navstyle = {
    backgroundColor: props.color,
    textColor: props.textColor
  }

  //console.log(props, 'PROS DE HEADERS')


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='sticky-top shadow-lg' style={navstyle}>
        <IconButton
          edge='start'
          className='nn'
          color='inherit'
          aria-label='menu'
          onClick={() => props.history.push('/')}>
          <IoIosCube size='1.5em' color={props.textColor} />
        </IconButton>
        <ThemeButton onClick={() => props.history.push('/')}>CryptoCenter</ThemeButton>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" as={Switch} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='m-lg-auto ml-sm-1' style={navstyle}>
            <ThemeButton

              onClick={() => props.history.push('/news')}>
              News
            </ThemeButton>
            <ThemeButton
              href=''

              onClick={() => props.history.push('/charts')}>
              Charts
            </ThemeButton>

            <ThemeButton
              href=''

              onClick={() => props.history.push('/wallets')}>
              Wallets
            </ThemeButton>
            <ThemeButton
              href=''

              onClick={() => props.history.push('/explorer')}>
              Explorer
            </ThemeButton>
            <ThemeButton
              href=''

              onClick={() => props.history.push('/xchange')}>
              Exchanges
            </ThemeButton>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          </Form>


          <IoMdSunny size='1.5em' color={props.textColor} />
          <ThemeSwitch
            checked={checked}
            onClick={() => {
              props.setThemeAction(
                props.color === 'whitesmoke' ? 'light' : 'dark'
              )
              Check(!checked)
            }
            }
          />
          <IoIosMoon size='1.5em' style={{ color: props.textColor }} />
        </Navbar.Collapse>
        
      </Navbar>
    </>
  )
}

const mapStateToProps = state => {
  return {

    color: state.theme.theme.color,
    textColor: state.theme.theme.textColor
  }
}

const mapDispatchToProps = dispatch => ({
  setThemeAction: payload => dispatch(setThemeAction(payload))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
