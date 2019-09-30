import React, { useEffect } from 'react'
import { getWallets } from '../actions/apiData'
import { Card, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import Rating from 'react-rating';
import {
  TiStarFullOutline, TiStarOutline
} from 'react-icons/ti'
import { WhisperSpinner } from "react-spinners-kit";

const Wallets = ({ getWallets, walletsData }) => {
  useEffect(() => {
    console.log('mejecuto')
    getWallets()
  }, [])

  return (
    <div>
      <h1 className="m-5">Crypto Wallets</h1>
      <div className="row justify-content-center align-content-center align-items-center">
        {walletsData.Data ?
          Object.keys(walletsData.Data).map((line, index) => (

            <Card className="col-lg-10 col-sm-10 bg-dark text-white m-3 m-sm-3" >
              <div className='row'>
                <div className='col-lg-4 col-sm-8'>

                  <img src={`https://www.cryptocompare.com/${walletsData.Data[line].LogoUrl}`}

                    className='m-2'
                    width='150'
                    height='150'
                  />
                  <p><Rating initialRating={walletsData.Data[line].Rating.Avg}
                    emptySymbol={<h6><TiStarOutline /></h6>}
                    fullSymbol={<h6><TiStarFullOutline /></h6>
                    } />
                  </p>
                </div>
                <div className='col-lg-8 col-sm-10'>
                  <p>{walletsData.Data[line].Name}</p>

                  <p>{walletsData.Data[line].Security}</p>
                  <p>{walletsData.Data[line].Anonimity}</p>
                  <p>{walletsData.Data[line].Coins.map(coins => <li>{coins}</li>)}</p>
                  <p>{walletsData.Data[line].WalletFeatures}</p>
                  <p><a href={walletsData.Data[line].AffiliateURL}><Button>link</Button></a></p>
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
const mapDispatchToProps = dispatch => ({
  getWallets: () => dispatch(getWallets())
})

const mapStateToProps = state => {
  return {
    walletsData: state.wallets.walletsData,
    loadingwl: state.wallets.loading,
    error: state.wallets.error,
    apiData: state.apiData.apiData
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallets)
