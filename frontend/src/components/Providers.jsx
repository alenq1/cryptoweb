import React, { useState, useEffect } from 'react'
import { WhisperSpinner } from "react-spinners-kit";
import NewsSites from './NewsSites'
import { getApiNews, getLatest } from '../actions/apiData'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    datanews: state.news.datanews,
    loadingrx: state.news.loading,
    error: state.news.error,
    latestnews: state.news.latestnews
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
      {(loadingrx === true && datanews.length === 1) ? (
        <center>
          <h1 className='mt-5'>Loading...</h1>
          <WhisperSpinner
            size='500'
            color="#686769"
            loading='true'
            frontColor="#386769"
            backColor="#646459"
            className="mt-5"
          />
        </center>
      ) : (
          <>
            <h1 className='m-5'> Crypto News Rank</h1>
            <NewsSites
              newsData={datanews}
              loading={loadingrx}
              latestnews={latestnews}
              getLatest={getLatest}
            />
          </>
        )}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Providers)
