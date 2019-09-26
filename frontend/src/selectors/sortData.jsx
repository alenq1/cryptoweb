import { createSelector } from 'reselect'
import { orderBy } from 'lodash'


//const rawData = state => state.apiDataReducer && state.apiDataReducer.apiData
const rawData = state => state.WSocket && state.WSocket.wsData
const getKey = state => state.apiData && state.apiData.sortKey
const getDirection = state => state.apiData && state.apiData.sortDirection


export const sortData = createSelector(


    [rawData, getKey, getDirection],

    (data, sortKey, direction) => {

        //console.log(data, "RAWDAT")
        //console.log(sortKey, "GETKEY")
        //console.log(direction, "GET DIRECTIRO")



        if (sortKey === 'price' && data[0].cryptoData.length > 1) {
            //console.log("EJECYTO EL SORT CON ORDER BY")
            //console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.PRICE }, direction)
        }
        if (sortKey === 'pctChange' && data[0].cryptoData.length > 1) {
            //console.log("EJECYTO EL SORT CON ORDER BY")
            //console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.CHANGEPCT24HOUR }, direction)
        }
        if (sortKey === 'marketCap' && data[0].cryptoData.length > 1) {
            //console.log("EJECYTO EL SORT CON ORDER BY")
            //console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.MKTCAP }, direction)
        }
        else {
            //console.log("OMITO EL SORT")
            //console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            return data
        }
    }

)

