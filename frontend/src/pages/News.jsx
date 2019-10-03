import React, { useState, useEffect } from 'react'
import { WhisperSpinner } from "react-spinners-kit";
import NewsSites from '../components/NewsSites'
import { getApiNews, getLatest } from '../actions/apiData'
import { connect } from 'react-redux'


const News = ({
    getApiNews,
    loadingrx,
    datanews,
    error,
    latestnews,
    getLatest
}) => {

    useEffect(() => {

        getApiNews()
    }, [])

    //console.log(datanews, 'NEWS VOY A PASAR LOS RESULTADOS ')

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
    getLatest: (site, keyword) => dispatch(getLatest(site, keyword))

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News)
