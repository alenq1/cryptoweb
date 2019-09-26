import React from 'react'
//import {Card} from 'react-bootstrap'
import { FaRegCaretSquareDown } from 'react-icons/fa'
import { Card, Alert } from 'react-bootstrap';
import { SwishSpinner } from 'react-spinners-kit';


const NewsSites = (props) => {

  console.log(props, "PROPS RECIBIDAS EN NES SITES")
  return (
    <center><div className="row">

      {props.newsData && props.newsData.error ?

        <Alert variant='danger'>ERROR</Alert>
        :

        props.newsData.map((data, index) => (
          <Card className="bg-dark text-white m-5 m-sm-5 col-lg-5 col-sm-10">
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
                  <button><a href={data.link}>Go to Site</a></button>

                  <button onClick={() => props.getLatest(data.link)}>Get Latest News</button>
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

    </div></center>
  )
}

export default NewsSites
