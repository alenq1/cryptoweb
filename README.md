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
   - websocket communication flow send, proccess and receive messages
   - communication from task to websocket channels groups 

Celery
   - Set celery tasks configurations on settings and create app for tasks (celery.py)
   - Crate celery schedule task for periodic execution
   - Run celery worker with beat monitor
   - Flower services monitoring celery tasks
   - Periodic tasks pass values to websocket channel group
   - Setting multithreadind on periodic task for concurrent requests

Frontend
   - Setting Reducer for websocket incoming data, and actions for save into store
   - Changing get data from werbsocket data store to components 