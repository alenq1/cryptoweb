import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
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
import { WServer } from '../services/apisources'

const hist = createBrowserHistory()


const Main = ({ color, textColor, ConnectWS, image }) => {

  //console.log(image, "DESDEREDUX")

  const style = {
    // background: `linear-gradient(61deg, #000000 0%, rgba(0, 0, 
    //   0, .6) 70%),url(${imagecode1})`,
    backgroundImage: `url(${image})`,
    textShadow: `${color === 'whitesmoke' ? '' : '5px 5px #000000'} `,
    textOutline: color,
    textDecoration: 'blink',
    backgroundColor: color,
    color: textColor,
    textAlign: 'center',
    height: '100%'
  }

  useEffect(() => {

    ConnectWS(WServer)

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

const mapStateToProps = state => {
  return {
    color: state.theme.theme.color,
    textColor: state.theme.theme.textColor,
    image: state.theme.theme.image
  }
}

export default connect(mapStateToProps, { ConnectWS })(Main)
