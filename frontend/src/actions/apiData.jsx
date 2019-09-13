import {
  GET_DATA,
  ERROR_GET,
  GET_NEWS,
  ERROR_GET_NEWS,
  LOADING_FETCH,
  GET_LATEST,
  LOADING_CHART,
  CHART_READY,
  ERROR_GET_CHART,
  LOADING_WALLETS,
  GET_WALLETS,
  ERROR_GET_WALLETS
} from '../constants/action-types'
import axios from 'axios'
import adapter from 'axios/lib/adapters/http'

export const getApiData = () => dispatch => {
  if (localStorage.getItem('apiData') === null) {
    console.log(localStorage.getItem('apiData'))
    axios(
      'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD'
    )
      .then(data => {
        dispatch({ type: GET_DATA, payload: data.data.Data })
        localStorage.setItem('apiData', JSON.stringify(data.data.Data))
      })
      .catch(error => {
        console.log(error, 'ERROR APIDATA')
        dispatch({ type: ERROR_GET, payload: error })
      })
  } else {
    dispatch({
      type: GET_DATA,
      payload: JSON.parse(localStorage.getItem('apiData'))
    })
  }
}

export const getApiNews = () => dispatch => {
  dispatch({ type: LOADING_FETCH })
  axios('api/news/')
    .then(data => {
      if (!data.data['error']) {
        dispatch({ type: GET_NEWS, payload: data.data })
        localStorage.setItem('newsData', JSON.stringify(data.data))
      }
    })

    .catch(error => {
      console.log(error, 'ERROR NEWSDATA')
      dispatch({ type: ERROR_GET_NEWS, payload: error })
    })
}

export const getLatest = site => dispatch => {
  console.log(site, 'PETICON PARA BUSCAR')
  dispatch({ type: LOADING_FETCH })
  axios
    .post(
      'api/news/',
      { searchsite: site },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    .then(data => {
      dispatch({ type: GET_LATEST, payload: data.data })
      localStorage.setItem('latestnews', JSON.stringify(data.data))
    })
    .catch(error => {
      console.log(error, 'ERROR APIDATA')
      dispatch({ type: ERROR_GET_NEWS, payload: error })
    })
}

///////////////////////
export const getChartData = (topsymbol, limit) => dispatch => {
  const localChartData = JSON.parse(localStorage.getItem('chartdata'))

  console.log(localChartData, 'valor de localstroare data')

  if (localChartData === null || localChartData.length === 0) {
    console.log('ME JECUTO APIDATA')
    const promises = []

    console.log((topsymbol, limit), 'PETICON PARA CHART')
    dispatch({ type: LOADING_CHART })
    //localStorage.setItem('chartdata', '')

    console.log(topsymbol, 'TOPSYMBOL LIST')

    if (topsymbol && topsymbol !== null) {
      let chartData = []
      console.log('ahora antes de ahcer los fetchs')
      topsymbol.map(async symbols => {
        promises.push(
          axios.get(
            `https://min-api.cryptocompare.com/data/histoday?fsym=${symbols}&tsym=USD&limit=${limit}`
          )
        )
      })
      axios
        .all(promises)
        .then(data => {
          //data.data.Data['symbol'] = symbols
          console.log(data, 'RESUKTADO TOTAL GLOBAL')
          console.log(topsymbol.length, 'ARRAY SYMBOLO')
          for (let i = 0; i < topsymbol.length; i++) {
            chartData.push({
              time: '1D',
              symbol: topsymbol[i],
              finaldata: data[i].data.Data
            })
          }
          dispatch({
            type: CHART_READY,
            payload: chartData
          })
          console.log(chartData, 'PARA GUARDAR EN LOCALSTORAGE')
          localStorage.setItem('chartdata', JSON.stringify(chartData))
        })

        .catch(error => {
          console.log(error, 'ERROR APIDATA')
          dispatch({ type: ERROR_GET_CHART, payload: error })
        })
    } else {
      dispatch({ type: ERROR_GET_CHART, payload: 'error al cargar' })
    }
  } else {
    console.log('me ejecuto YO ALFINAL  de APIDATa')
    dispatch({
      type: CHART_READY,
      payload: JSON.parse([localStorage.getItem('chartdata')])
    })
  }
}

export const getWallets = () => dispatch => {
  dispatch({ type: LOADING_WALLETS })
  axios('api/wallets/')
    .then(data => {
      if (!data.data['error']) {
        dispatch({ type: GET_WALLETS, payload: data.data })
        localStorage.setItem('walletsData', JSON.stringify(data.data))
      }
    })

    .catch(error => {
      console.log(error, 'ERROR WALLETSDATA')
      dispatch({ type: ERROR_GET_WALLETS, payload: error })
    })
}

// export const fetchData = () => {
//   return dispatch => {
//       const promises = [];

//       dispatch({type: FETCHING_DATA});
//       Promise.all(
//         [...new Array(3)].map((ignore,i)=>i === 0 ? 0 : (i + "01"))
//         .map(
//           start=>axios.get(`${api_root_url}/v1/?start=${start}`)
//         )
//       ).then(
//         results=>results.forEach(
//           result=>
//             dispatch({type: FETCH_DATA_SUCESS, payload: result.data})
//           )
//       ).catch(
//         err => dispatch({type: FETCH_DATA_ERR, payload: err.data})
//       );
//       //not sure why you want to return something here
//       //return Promise.all(promises)
//   }
// }
