import React, { useEffect } from 'react'
import { getWallets } from '../actions/apiData'
import { connect } from 'react-redux'

const Wallets = ({ getWallets, walletsData }) => {
  useEffect(() => {
    console.log('mejecuto')
    getWallets()
  }, [])

  return (
    <div>
      {walletsData ?
        walletsData.map(data =>
          <div>
            <p>{data.walletUrl}</p>
            <p>{data.walletName}</p>
          </div>
        )
        :
        <p>Error</p>
      }
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  getWallets: () => dispatch(getWallets())
})

const mapStateToProps = state => {
  return {
    walletsData: state.walletsReducer.walletsData,
    loadingwl: state.walletsReducer.loading,
    error: state.walletsReducer.error,
    apiData: state.apiDataReducer.apiData
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallets)
