import React, { useState } from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Switch from '@material-ui/core/Switch'
import { FaBuffer, FaSearch } from 'react-icons/fa'
import { IoIosCube, IoIosMoon, IoMdSunny, IoMdSearch } from 'react-icons/io'
import coin from 'cryptocurrency-icons/svg/color/generic.svg'
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
      color: props.txtColor,
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

  const theme = {
    backgroundColor: props.color,
    textColor: props.txtColor
  }

  console.log(props, 'PROS DE HEADERS')
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='sticky-top shadow-lg' style={theme}>

        <IconButton
          edge='start'
          className='nn'
          color='inherit'
          aria-label='menu'
          onClick={() => props.history.push('/')}>
          <IoIosCube size='1.5em' color={props.txtColor} />
        </IconButton>
        <ThemeButton>CryptoCenter</ThemeButton>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='ml-auto'>
            <ThemeButton
              style={theme}
              onClick={() => props.history.push('/news')}>
              News
            </ThemeButton>
            <ThemeButton
              href=''
              style={theme}
              onClick={() => props.history.push('/charts')}>
              Charts
            </ThemeButton>

            <ThemeButton
              href=''
              style={theme}
              onClick={() => props.history.push('/wallets')}>
              Wallet
            </ThemeButton>
            <ThemeButton
              href=''
              style={theme}
              onClick={() => props.history.push('/explorer')}>
              Explorer
            </ThemeButton>
            <ThemeButton
              href=''
              style={theme}
              onClick={() => props.history.push('/xchange')}>
              CoinChange
            </ThemeButton>
          </Nav>
        </Navbar.Collapse>
        <IoMdSearch size='1.5em' color={props.txtColor} />

        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />

          <IoMdSunny size='1.5em' color={props.txtColor} />
          <ThemeSwitch
            checked={checked}
            onClick={() => {
              props.setThemeAction(
                props.color === 'black' ? 'whitesmoke' : 'black'

              )
              Check(!checked)
            }
            }
          />
          <IoIosMoon size='1.5em' style={{ color: props.txtColor }} />
        </Form>

      </Navbar>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setThemeAction: payload => dispatch(setThemeAction(payload))
})

const mapStateToProps = state => {
  return {
    color: state.theme.theme.color,
    txtColor: state.theme.theme.textColor
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
