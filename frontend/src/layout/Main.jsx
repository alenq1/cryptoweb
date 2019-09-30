import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Home from '../pages/Home'
import News from '../pages/News'
import Charts from '../pages/Charts'
import Wallets from '../pages/Wallets'
import Explorer from '../pages/Explorer'
import xChange from '../pages/xChange'
import { ConnectWS } from '../actions/websocket'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

const hist = createBrowserHistory()

const mapStateToProps = state => {
  return {
    color: state.theme.theme.color,
    txtColor: state.theme.theme.textColor
  }
}

const Main = ({ color, txtColor, ConnectWS }) => {
  //console.log(color, txtColor,  "DESDEREDUX")
  const imagecode1 = require("../layout/imgs/crypto8.png");
  const imagecode2 = require("../layout/imgs/crypto7.jpg");

  const stylesubs = {


    height: "420px"
  };


  const style = {
    // background: `linear-gradient(61deg, #000000 0%, rgba(0, 0, 
    //   0, .6) 70%),url(${imagecode1})`,
    backgroundImage: color === 'whitesmoke' ? `url(${imagecode1})` : `url(${imagecode2})`,
    textShadow: `5px 5px ${color === 'whitesmoke' ? '#ffffff' : '#000000'} `,
    textOutline: color,
    textDecoration: 'blink',

    backgroundColor: color,
    color: txtColor,
    textAlign: 'center',
    height: '100%'
  }

  useEffect(() => {

    ConnectWS('ws://192.168.1.4/ws/test')
  }, [])


  return (
    <div style={style}>
      <Router history={hist}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/news' component={News} />
          <Route exact path='/charts' component={Charts} />
          <Route exact path='/wallets' component={Wallets} />
          <Route exact path='/explorer' component={Explorer} />
          <Route exact path='/xchange' component={xChange} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default connect(mapStateToProps, { ConnectWS })(Main)
