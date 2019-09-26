import { createSelector } from 'reselect'
import { orderBy } from 'lodash'
import { getChartData } from '../actions/apiData'


const rawData = state => state.apiData && state.apiData.apiData
const getKey = state => state.apiData && state.apiData.sortKey
const getDirection = state => state.apiData && state.apiData.sortDirection


export const TopCharts = createSelector(


    [rawData, getKey, getDirection],

    (data, sortKey, direction) => {

        console.log(data, "RAWDAT")
        console.log(sortKey, "GETKEY")
        console.log(direction, "GET DIRECTIRO")


        const numberTop = (numTop) => {

            if (data.length > 1) {
                let Coinlist = []
                for (let topCrypto = 0; topCrypto <= numTop; topCrypto++) {
                    console.log(data[topCrypto].CoinInfo.Name, "SYMBOLO PARA BUSCAR DATA")
                    Coinlist.push(data[topCrypto].CoinInfo.Name)

                }
                return Coinlist

            }
            else {
                return null
            }


        }
        return numberTop(10)

    })