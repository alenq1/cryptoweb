import React, { useEffect } from 'react'
import { getWallets } from '../actions/apiData'
import { UrlApiImage } from '../services/apisources'
import { Card, Button, Alert, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import Rating from 'react-rating';
import {
  TiStarFullOutline, TiStarOutline
} from 'react-icons/ti'
import { WhisperSpinner } from "react-spinners-kit";

const Wallets = ({ getWallets, walletsData, theme }) => {

  const style = {
    th: {
      background: 'linear-gradient(to right, #000428, #004e92)',
      color: 'white',
      width: '30'
    },
    td: {
      color: theme.textColor,
      textAlign: 'left',

    }



  }

  useEffect(() => {
    //console.log('mejecuto')

    getWallets()
  }, [])

  return (
    <div>
      <h1 className="m-5">Crypto Wallets</h1>
      <div className="row justify-content-center align-content-center align-items-center">
        {walletsData.Data ?
          Object.keys(walletsData.Data).map((line, index) => (

            <Card className="col-lg-10 col-sm-10 m-3 m-sm-3"
              style=
              {{
                background: theme.color === 'black' ? 'linear-gradient(to bottom, #232526, #414345)'
                  : 'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
                color: theme.textColor
              }}
            >
              <div className='row'>
                <div className='col-lg-2 col-sm-4 mt-4 mb-4'>

                  <img src={`${UrlApiImage}${walletsData.Data[line].LogoUrl}`}

                    className='m-2'
                    width='150'
                    height='150'
                  />
                  <p><Rating initialRating={walletsData.Data[line].Rating.Avg}
                    emptySymbol={<h6><TiStarOutline /></h6>}
                    fullSymbol={<h6><TiStarFullOutline /></h6>
                    } />
                  </p>
                  <p>{walletsData.Data[line].Name}</p>
                </div>
                <div className='col-lg-10 col-sm-6'>
                  <Table hover striped className='m-1'>
                    <tr><th style={style.th}>Security</th><td style={style.td}>{walletsData.Data[line].Security}</td></tr>
                    <tr><th style={style.th}>Coins</th><td style={style.td}>{walletsData.Data[line].Coins.map(coins => ` ${coins} `)}</td></tr>
                    <tr><th style={style.th}>Platforms</th><td style={style.td}>{walletsData.Data[line].Platforms.map(os => ` ${os} `)}</td></tr>
                    <tr><th style={style.th}>Features</th><td style={style.td}>{walletsData.Data[line].WalletFeatures}</td></tr>
                    <tr><td colSpan="2"><a href={walletsData.Data[line].AffiliateURL}><Button>Site Link</Button></a></td></tr>
                  </Table>
                </div>
              </div>

            </Card>

          ))
          :
          <>
            <h1 className='mt-5 p-5'>Loading...</h1>
            <WhisperSpinner
              size='500'
              color="#686769"
              loading='true'
              frontColor="#386769"
              backColor="#646459"
              className="mt-5"
            />
          </>

        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    walletsData: state.wallets.walletsData,
    loadingwl: state.wallets.loading,
    error: state.wallets.error,
    apiData: state.apiData.apiData,
    theme: state.theme.theme
  }
}

const mapDispatchToProps = dispatch => ({
  getWallets: () => dispatch(getWallets())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallets)
