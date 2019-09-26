import React from 'react'
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
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

const hist = createBrowserHistory()

const mapStateToProps = state => {
  return {
    color: state.theme.theme.color,
    txtColor: state.theme.theme.textColor
  }
}

const Main = ({ color, txtColor }) => {
  //console.log(color, txtColor,  "DESDEREDUX")

  const style = {
    backgroundColor: color /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    color: txtColor,
    textAlign: 'center',
    height: '100%'
  }

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

export default connect(mapStateToProps)(Main)
