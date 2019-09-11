import React, {useEffect, useState} from 'react'
import {Card} from 'react-bootstrap'
import { connect } from 'react-redux'
import {setSort} from '../actions/sort'
import {sortData} from '../selectors/sortData'


import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



//import {getApiData, setSort} from '../actions/apiData'
//import { rawData, sortData } from '../selectors/sortData';

import {customconn} from '../services/apisources'

//import {Linecharts, Line2, Line3, Line4, Line5, Line6} from './Cryptocharts'
import {CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar,
        IconButton, Typography
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';


const style={

// #explode .info { transition: all 0.7s; transform: scale(0.8); }
// #explode .pic { transition: all 0.7s; }
// #explode li:hover .info { opacity:1; transform: scale(1); }
// #explode li:hover .pic { opacity:0; transform: scale(1.4); }

}















let ticker='btcsdt'
let time='4h'

console.log("MMINICHAR LLAMADO")


const Minichart = (props) => {

const [data2, setd] = useState('')


    useEffect(() => {

            
            

        //     //const customconn = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${ticker}@kline_${time}`)
        //     console.log(customconn, "WEBSOCEKT SECUDNDO")
        //     customconn.onopen = function(evt) {
        //     // send Subscribe/Unsubscribe messages here (see below)
        //     //customconn.send(JSON.stringify({ method: "subscribe", topic: "allTickers", symbols: ["$all"] }));
        //     //customconn.send(JSON.stringify({ stream: "!miniTicker", data: "@arr"}));
        //     console.log("COECNTADOSEGUNDIO")
        //     }
        //     customconn.onmessage = function(evt) {
        //         //console.info('received data', JSON.parse(evt.data));
        //         setd(JSON.parse(evt.data))
        //         //console.log("RECIBIENDO", JSON.parse(evt.data))
        //     };
        //     customconn.onerror = function(evt) {
        //         console.error('an error occurred', evt.data);
        //     };
        //     customconn.onclose = function(evt) {
        //       console.info('close', evt);
        //       customconn.send(JSON.stringify({ method: "close" }));
        //   };

          console.log(data2, "effect")
          

    }, [])

    console.log(props.apiData, "DATA cRUDA")
    
    
    
     let par1 = []
      if(props.apiData.length > 1){
        console.log(props.apiData, "APIDATA A MINICUADROS")
            for (let i = 0; i < 5; i++){
                par1.push(props.apiData[i])
            }
        }
       else{
           par1 = null
       }
       console.log(par1, "SOY PAR1")



    
    //let par2 = 'USDT'
    //let filters = par1.map( kline => kline+par2)
    //console.log(filters, "RESULT DE FILTRADO")

    //let logos = par1.map( kline => `import ${kline.toLowerCase()} from 'cryptocurrency-icons/svg/color/${kline.toLowerCase()}.svg'`)
    //console.log(logos, "LOGOS")
    
    
    // let topper = props.data.filter( filtered => 
    //     filtered.symbol === filters[0] ||
    //     filtered.symbol === filters[1] ||
    //     filtered.symbol === filters[2] ||
    //     filtered.symbol === filters[3] ||
    //     filtered.symbol === filters[4] 

    
    //)
    console.log(par1, "FILTRADO")

    return (
        <div>
        <h2 className="m-5">Top 5 Crypto  <FormControl >
        <InputLabel htmlFor="age-simple"></InputLabel>
        <Select
          value={props.sortKey}
          onChange={(e) => props.setSort(e.target.value)}
          input={<OutlinedInput labelWidth="100" name="age" />}
          
        >
          <MenuItem value={'price'}>Price</MenuItem>
          <MenuItem value={'pctChange'}>% Change</MenuItem>
          <MenuItem value={'marketCap'}>Market Cap</MenuItem>
        </Select>
      </FormControl> {props.sortDirection === "desc" ? "Winners" : "Losers"}</h2>
        <div className="row" style={style}>
            { par1 === null
            ? 0
            :
            par1.map( (ticker, index) =>
            <Card className="bg-dark text-white ml-4 mr-3 col-2" key={index}>
                <Card.Header>
                <div>
                <img src={`https://www.cryptocompare.com/${ticker.CoinInfo.ImageUrl}`} height="20px" width="20px" className="mr-3" />
                
                <span className="ml-4">{ticker.CoinInfo.Name}</span>
                </div>
                </Card.Header>
                <Card.Body className="text-align-left">
                {!par1? 0 : 
                <>
                {/* <Line6
                time={ticker.openTime}
                values={ticker.history}
                data={props.klinedata}
                /> */}
                
                <h4>{ticker.DISPLAY.USD.PRICE}</h4>
                <h5 style={ticker.RAW.USD.CHANGEPCT24HOUR > 0 ? { color: "#39FF33"}  : {  color: "red" }}
                  >
                    {ticker.DISPLAY.USD.CHANGEPCT24HOUR}%</h5>
                </>
                

                
                }      
                </Card.Body>
            </Card>
            )}
                    
        </div>
        </div>
    )
}

const mapStateToProps = state => {
  
    return { apiData: sortData(state),
             sortKey: state.apiDataReducer.sortKey,
             sortDirection: state.apiDataReducer.sortDirection
    };
 
};


const mapDispatchToProps = dispatch => ({
    setSort: (sortkey) => dispatch(setSort(sortkey))
    //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch)
  });


export default connect(mapStateToProps, mapDispatchToProps)(Minichart)
    