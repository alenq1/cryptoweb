import { createSelector } from 'reselect'
import { orderBy } from 'lodash'
import { getChartData } from '../actions/apiData'

const rawData = state => state.WSocket && state.WSocket.wsData
//const rawData = state => state.apiData && state.apiData.apiData
//const getKey = state => state.apiData && state.apiData.sortKey
//const getDirection = state => state.apiData && state.apiData.sortDirection


export const TopCharts = createSelector(


    [rawData],

    (data) => {

        //console.log(data, "RAWDATA PARA CHART")


        const numberTop = (numTop) => {

            if (data[0].cryptoData.length > 1) {
                let Coinlist = []
                for (let topCrypto = 0; topCrypto <= numTop; topCrypto++) {
                    //console.log(data[0].cryptoData[topCrypto].CoinInfo.Name, "SYMBOLO PARA BUSCAR DATA")
                    Coinlist.push(data[0].cryptoData[topCrypto].CoinInfo.Name)

                }
                return Coinlist

            }
            else {
                return null
            }


        }
        return numberTop(10)

    })