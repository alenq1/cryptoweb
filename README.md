Docker-Compose
   - create a base template for backend services for app, celery, websockets using YAML merge type
   - set entrypoint for each backend service
   - TODO
     - [] add "x" on the base service for define extension
     - [] set enviroment variables more flexible
   
  

Set django Channels
   - create asgi.py and routing.py on backend folder
   - add on settings.py channels layers and asgi configs
   - add on proxy location to redirect websocket connections, and allowed hostname (container)
   - create routing inside app, and create a test consumer 
   - TODO
     [] test the websocket communication flow send, proccess and receive messages
     [] communication with worker or tasks
