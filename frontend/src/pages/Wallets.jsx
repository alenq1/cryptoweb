import React, { useEffect } from 'react'
import { getWallets } from '../actions/apiData'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

const Wallets = ({ getWallets, walletsData }) => {
  useEffect(() => {
    console.log('mejecuto')
    getWallets()
  }, [])

  return (
    <div className="align-content-center">
      <h1 className="m-5">Crypto Wallets</h1>
      <div className="row">
        {walletsData ?
          walletsData.map(data =>

            <Card className="col-lg-8 col-sm-8 bg-dark text-white m-5" >
              <p>{data.walletName}</p>
              <p>{data.walletUrl}</p>
            </Card>

          )
          :
          <p>Error</p>
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
