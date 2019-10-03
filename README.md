# CryptoCenter Site

   - This site was developed for learning purposes, (Frontend, Backend)
   - Give some latest iinfo and data inthe crypto world
   - Conut with the following stack:
  
     ## Frontend Side
       - React 16.8
         - UI packages
           - react-bootstrap
           - react-icons
           - react-spinners-kit
           - react-spring  
         - State Management
           - Redux
           - Redux Thunk
           - Reselect
         - Handling Data
           - Axios
           - lodash
           - momentjs
           - echarts, react-echarts
      
     ## Backend Site
       - Django 2.2.1
         - API handling 
           - Django Rest Framework
         - BackGround and Scheduled Tasks
           - Celery 4
           - Celery Beat
           - celery Redis
         - Websocket Streaming Data
           - Channels
           - redis channel layer
         - Scraping Data
           - BeautifulSoup
           - Requests
         - Concurrent Requests
           - Threads
         - Other Tools
           - uvicorn for Websockets
           - Cors Headers
           - Optional Heroku Settings
        
     ## Additional Stack
       - Database backend with postgres or sqlite
       - Proxy with nginx
       - Celery Flower for Monitor tasks

        
     ## Deploy tools
       - Docker 
       - Docker Compose
       - Custom entrypoints
       - Custom Enviroments Variables
       - HealthChecks and Wait for Ready Services
       - Optional procfile Heroku

# How to run

  ## Docker way
  
  The docker compose file has a base template image for backend services, and proxy for serve static files, redis for channels and celery tasks, and optional postgres database to save the data if it needed 
     
  if you have docker and docker-compose installed you need to build images in docker-compose and custom Dockerfiles in the backend and frontend folders

    docker-compose build 
      
  After download and build the images just run the app with the command.

    docker-compose up -d

  ## Stand Alone (Buscar Nombre)
  - TODO
  - []
  
# Site Description

  ## Overview

  - The site displays information in 6 sections and every section, has its own indepent functionality which interacts with the backend side or external api
  - There is also a main section at first place, connects with backend websocket server and waits for new stream messages from websocket and save it on a redux state, Also has a React router switch to link every section
  - It shows a header with the menu access to every section and shows a theme button switch with displays light o dark theme, throught to redux store state
      
            
  ### Home Section
  - This section has 3 components 
  - Minichart component which shows the top 5 cryptocurrency info sorted by Price, Market Cap an Percent change, and switch with high and low value in a select  menu, using a redux selector for sort this information, there is animation on value changes from the redux state
  - Table Component show a list of top crypto infor from the redux state and displays on a table and sort data from the table head titles, for Price, Market Cap an Percent change, and show a detail in a modal
  - Modal Crypto show a modal with a additional info passed through table component and show a graphic with ramdom data (for now)
            
  ### News Section
  - In this sections display a list with a top sites for crypto news based on the scraped page defined in the sources file 
  - make a api request to django backend views and this views calls a scraping function with parameters to find in the target site and brings back  to frontend
  - It also has a button which call another request to backend to scrap the actual site with a keyword and brings back the results of the link associatd with keyword

  ### Chart Section

  - Here uses a redux selector to filter the top 10 results at that time and then executes an concurrent apicall to get the values for displays in a chart
  - There is a 3 options for display chart data, Daily, Hourly and minute, every time its selected execute the process again
            
  ### Wallet Section
  - This section only make an api call to backend to execute a more secure external apic all with a key provided by the target site, and brings back the result to frontend

  ### Explorer Section 
  - The simplest section only shows a table with data from redux state, updated from websocket streaming
            
  ### Exchange Section
  - similar to explorer and only additional visual stuff like progress bar and rating stars  

  Finally the frontend has a sources file with a lot of const for access some commons url and values to avoid hardcoding 

  ## Backend functions

  ### Endpoints
  -  /api/news  get and post request to execute scraping functions
  -  /api/wallets make a external api call with an api key
  -  ws/test/ to acceess the websocket stream

  ### Views 
  - newsApi:  take a get request with the main site to scrap, and response the result, post request take the actual site and a keyword to scrap an response
  - walletApi: just call to external api with a key and return a response to frontend

  ### Scraper
  - In first step get the target site and make an external api call and return the result, if scrap is defined also parses the site with beautifulSoup for detail scrap  
  - It has a scheduled celery task which makes external concurrent api calls, and send the result to a websocket group channel
  - The websocket consumer waits for shceduled task incoming messages ans sends to the frontend client channel 

  ## TODO
  - [] improve UI display (it reaaly basic)
  - [] add more schedule tasks and delayed tasks
  - [] define model for saving data from scheduled taks
  - [] make some manipulation in received data and displays on frontend
  - [] add "x" on the base service for define extension
  - [] set enviroment variables deploy more flexible
  