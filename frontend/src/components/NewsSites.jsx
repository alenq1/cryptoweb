import React from 'react'
import { FaRegCaretSquareDown } from 'react-icons/fa'
import { Card, Alert, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { SwishSpinner } from 'react-spinners-kit';
import { connect } from 'react-redux'


const NewsSites = (props) => {

  console.log(props, "PROPS RECIBIDAS EN NES SITES")


  return (

    <>
      {
        props.newsData && props.newsData[0].error ?
          <>
            <Alert className='align-content-center' variant='danger'>
              <b>ERROR</b><p>{props.newsData[0].error}</p>
            </Alert>
          </>
          :
          <center><div className="row">
            {props.newsData.map((data, index) => (
              <Card className="m-5 m-sm-5 col-lg-5 col-sm-10"
                style=
                {{
                  background: props.theme.color === 'black' ? 'linear-gradient(to bottom, #232526, #414345)'
                    : 'linear-gradient(to bottom, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
                  color: props.theme.textColor
                }}
              >
                <div className='row'>
                  <div className='col-lg-4 col-sm-8'>

                    <Card.Img src={data.image} variant='top' className='m-2' />
                    <p className='m-5'><h1>{data.rank}</h1></p>
                  </div>
                  <div className='col-lg-8 col-sm-10'>
                    <Card.Body>
                      <Card.Title>
                        {data.site}
                      </Card.Title>

                      {console.log(props.latestnews[0], "LATEST NEWS")}


                      <p>{data.description}</p>
                      <div className='m-3'>
                        <a href={data.link}><Button variant="dark">Go to Site</Button></a>

                        <ButtonGroup variant="info">
                          <DropdownButton as={ButtonGroup} title="Get Latest Info" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="news" onClick={() => props.getLatest(data.link, 'news')}>Latest News</Dropdown.Item>
                            <Dropdown.Item eventKey="price" onClick={() => props.getLatest(data.link, 'price')}>Price News</Dropdown.Item>
                            <Dropdown.Item eventKey="crypto" onClick={() => props.getLatest(data.link, 'crypto')}>Crypto News</Dropdown.Item>
                          </DropdownButton>
                        </ButtonGroup>
                      </div>
                      {props.loading ?
                        <div className='m-3'>
                          <SwishSpinner />
                        </div>
                        :
                        !(props.latestnews && props.latestnews.mainsite) ?
                          ''
                          :
                          props.latestnews.mainsite === data.link ?
                            props.latestnews.maindata.map(newsitem =>
                              newsitem.url ?
                                <li><a href={newsitem.url}>{newsitem.title}</a></li>
                                :
                                <Alert variant='danger'>No News get for this site now</Alert>
                            )
                            :
                            ''
                      }

                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))
            }
          </div>
          </center>


      }
    </>

  )
}

const mapStateToProps = state => {

  return {
    theme: state.theme.theme
  }

}

export default connect(
  mapStateToProps)
  (NewsSites)
