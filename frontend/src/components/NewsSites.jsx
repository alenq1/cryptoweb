import React from 'react'
//import {Card} from 'react-bootstrap'
import {FaRegCaretSquareDown} from 'react-icons/fa'
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const NewsSites = (props) => {

   console.log(props, "PROPS RECIBIDAS EN NES SITES")
    return (
        <center><div className="row">

        {props.newsData && props.newsData.error ? 

        <p>ERROR</p>
        :
        
         props.newsData.map( (data, index) => (
            <Card className="bg-dark text-white m-5">
                <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={data.image} height="80px" width="80px" className="m-2">
            {data.site}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FaRegCaretSquareDown/>
          </IconButton>
        }
        title={data.site}
        subheader={Date.now()}
      />
      <CardMedia
        
        
        title="Paella dish"
      />

                <CardContent>
                    
                    
                    
                    {console.log(props.latestnews[0], "LATEST NEWS")}
                    <button><a href={data.link}>Go to Site</a></button>
                    
                    <button onClick={() => props.getLatest(data.link)}>Get Latest News</button>
                    <ul>{!(props.latestnews && props.latestnews.mainsite) ?
                        0
                        :
                        props.latestnews.mainsite === data.link ?
                        props.latestnews.maindata.map( newsitem => 
                        <li><a href={newsitem.url}>{newsitem.title}</a></li> )
                        :
                        1
                        }
                    </ul>
                </CardContent>
              </Card>


        ))
        }
            
        </div></center>
    )
}

export default NewsSites
