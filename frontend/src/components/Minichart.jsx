import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setSort } from '../actions/sort'
import { sortData } from '../selectors/sortData'
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated, interpolate, } from 'react-spring';
import { Spring, Transition } from 'react-spring/renderprops'
import Fade from 'react-reveal/Fade'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { UrlApiImage } from '../services/apisources'

const style = {

  // #explode .info { transition: all 0.7s; transform: scale(0.8); }
  // #explode .pic { transition: all 0.7s; }
  // #explode li:hover .info { opacity:1; transform: scale(1); }
  // #explode li:hover .pic { opacity:0; transform: scale(1.4); }

}


const Minichart = (props) => {

  const [data2, setd] = useState('')


  useEffect(() => {

    //console.log(data2, "effect")

  }, [])

  //console.log(props.apiData, "DATA cRUDA")

  let par1 = []
  if (props.apiData.length > 1) {
    //console.log(props.apiData, "APIDATA A MINICUADROS")
    for (let i = 0; i < 5; i++) {
      par1.push(props.apiData[i])
    }
  }
  else {
    par1 = null
  }
  //console.log(par1, "SOY PAR1")


  return (
    <div>
      <Card.Header className=" rounded-top"
        style={{
          background: props.theme.color === 'white' && 
             'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
          color: props.theme.textColor,
          width: '30%',
          marginTop: '5%'
        }}
      >Top 5 Crypto
      <FormControl >

          <Select
            value={props.sortKey}
            onChange={(e) => props.setSort(e.target.value)}
            input={<OutlinedInput
              className="ml-2 mr-2"
              fullWidth
              margin='dense'
              name="age-simple" />}
          >
            <MenuItem value={'price'}>Price</MenuItem>
            <MenuItem value={'pctChange'}>% Change</MenuItem>
            <MenuItem value={'marketCap'}>Market Cap</MenuItem>
          </Select>
        </FormControl> {props.sortDirection === "desc" ? " Winners" : " Losers"}
      </Card.Header>
      <div className="row align-content-center col-lg-11 col-sm-11" style={style}>
        {par1 === null
          ? 0
          :
          par1.map((ticker, index) =>
            <div className='m-5 m-sm-3 col-lg-2 col-sm-8' key={index}>
            <Card 
              style=
              {{
                background: props.theme.color === 'black' ? 'linear-gradient(to bottom, #232526, #414345)'
                  : 'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
                color: props.theme.textColor,
                marginTop: '40%'
              }}
              key={index}>
              <Card.Header>
                <div>
                  <img src={`${UrlApiImage}${ticker.CoinInfo.ImageUrl}`} height="20px" width="20px" className="mr-3" />

                  <span className="ml-4">{ticker.CoinInfo.Name}</span>
                </div>
              </Card.Header>
              <Card.Body className="text-align-left">
                {!par1 ? 0 :
                  <>

                    <h4>
                      <Fade bottom spy={ticker.DISPLAY.USD.PRICE}>
                        
                        <div >{ticker.DISPLAY.USD.PRICE}</div>
                        </Fade>
                    </h4>
                    <h5 style={ticker.RAW.USD.CHANGEPCT24HOUR > 0 ? { color: "#1DAC22" } : { color: "red" }}
                    >
                      {ticker.DISPLAY.USD.CHANGEPCT24HOUR}%</h5>
                  </>
                }
              </Card.Body>
            </Card>
            </div>
          )}

      </div>
    </div >
  )
}

const mapStateToProps = state => {

  return {
    apiData: sortData(state),
    sortKey: state.apiData.sortKey,
    sortDirection: state.apiData.sortDirection,
    theme: state.theme.theme
  };

};


const mapDispatchToProps = dispatch => ({
  setSort: (sortkey) => dispatch(setSort(sortkey))
  //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Minichart)
