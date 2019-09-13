import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import NewsSites from './NewsSites'
import { getApiNews, getLatest } from '../actions/apiData'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    datanews: state.newsReducer.datanews,
    loadingrx: state.newsReducer.loading,
    error: state.newsReducer.error,
    latestnews: state.newsReducer.latestnews
  }
}

const mapDispatchToProps = dispatch => ({
  getApiNews: () => dispatch(getApiNews()),
  getLatest: site => dispatch(getLatest(site))
  //clearSortParams: bindActionCreators(actions.clearSortParams, dispatch)
})

const Providers = ({
  getApiNews,
  loadingrx,
  datanews,
  error,
  latestnews,
  getLatest
}) => {
  useEffect(() => {
    //getNews()
    getApiNews()
  }, [])

  console.log(datanews, 'NEWS VOY A PASAR LOS RESULTADOS ')
  return (
    <div>
      {datanews.length > 1 && loadingrx === true ? (
        <center>
          <h3 className='mt-5 text-white'>
            <CircularProgress />
            loading
          </h3>
        </center>
      ) : (
        <NewsSites
          newsData={datanews}
          loading={loadingrx}
          latestnews={latestnews}
          getLatest={getLatest}
        />
      )}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Providers)
