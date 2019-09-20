import { createSelector } from 'reselect'
import { orderBy } from 'lodash'


//const rawData = state => state.apiDataReducer && state.apiDataReducer.apiData
const rawData = state => state.WSocketReducer && state.WSocketReducer.wsData
const getKey = state => state.apiDataReducer && state.apiDataReducer.sortKey
const getDirection = state => state.apiDataReducer && state.apiDataReducer.sortDirection


export const sortData = createSelector(


    [rawData, getKey, getDirection],

    (data, sortKey, direction) => {

        console.log(data, "RAWDAT")
        console.log(sortKey, "GETKEY")
        console.log(direction, "GET DIRECTIRO")



        if (sortKey === 'price' && data[0].cryptoData.length > 1) {
            console.log("EJECYTO EL SORT CON ORDER BY")
            console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.PRICE }, direction)
        }
        if (sortKey === 'pctChange' && data[0].cryptoData.length > 1) {
            console.log("EJECYTO EL SORT CON ORDER BY")
            console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.CHANGEPCT24HOUR }, direction)
        }
        if (sortKey === 'marketCap' && data[0].cryptoData.length > 1) {
            console.log("EJECYTO EL SORT CON ORDER BY")
            console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            //setApidata(apiData.sort((a, b) => b.RAW.USD.MKTCAP - a.RAW.USD.MKTCAP))
            return orderBy(data[0].cryptoData, function (e) { return e.RAW.USD.MKTCAP }, direction)
        }
        else {
            console.log("OMITO EL SORT")
            console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            return data
        }
    }

)

//         {marketCap: false,
//                pctChange: false,
//                price: false })
//       //console.log(key, "KEYNAME")
//       //console.log(sortBy[key], "KEYVALUE")
//       //console.log(sortBy, "TOTALSTATE----SORT")
//     }
//     if(sortKey === 'marketCap' && sortBy[key] === false){
//       //setApidata(apiData.sort((a, b) => a.RAW.USD.MKTCAP - b.RAW.USD.MKTCAP)  )
//       SetSort({marketCap: true,
//                pctChange: false,
//                price: false })
//       // console.log(key, "KEYNAME")
//       // console.log(sortBy[key], "KEYVALUE")
//       // console.log(sortBy, "TOTALSTATE----SORT")
//     }
//     if(sortKey === 'pctChange' && sortBy[key] === true){
//       //setApidata(apiData.sort((a, b) => b.RAW.USD.CHANGEPCT24HOUR - a.RAW.USD.CHANGEPCT24HOUR))
//       SetSort({marketCap: false,
//                pctChange: false,
//                price: false })
//     //   console.log(key, "KEYNAME")
//     //   console.log(sortBy[key], "KEYVALUE")
//     //   console.log(sortBy, "TOTALSTATE----SORT")
//      }
//     if(sortKey === 'pctChange' && sortBy[key] === false){
//       //setApidata(apiData.sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR - b.RAW.USD.CHANGEPCT24HOUR)  )
//       SetSort({marketCap: false,
//         pctChange: true,
//         price: false })
//       // console.log(key, "KEYNAME")
//       // console.log(sortBy[key], "KEYVALUE")
//       // console.log(sortBy, "TOTALSTATE----SORT")
//     }
//     if(sortKey === 'price' && sortBy[key] === true){
//       //setApidata(apiData.sort((a, b) => b.RAW.USD.PRICE - a.RAW.USD.PRICE))
//       SetSort({marketCap: false,
//         pctChange: false,
//         price: false })
//       // console.log(key, "KEYNAME")
//       // console.log(sortBy[key], "KEYVALUE")
//       // console.log(sortBy, "TOTALSTATE----SORT")
//     }
//     if(sortKey === 'price' && sortBy[key] === false){
//       //setApidata(apiData.sort((a, b) => a.RAW.USD.PRICE - b.RAW.USD.PRICE))
//       SetSort({marketCap: false,
//         pctChange: false,
//         price: true })
//       // console.log(key, "KEYNAME")
//       // console.log(sortBy[key], "KEYVALUE")
//       // console.log(sortBy, "TOTALSTATE----SORT")

//     }  

// }


