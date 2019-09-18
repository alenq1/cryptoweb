#!/bin/sh

#./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- daphne backend.asgi:application --bind 0.0.0.0 --port 9000
#./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- uvicorn backend.asgi:application --reload --port 9000
#./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- uvicorn backend.asgi:application --reload --port 9000
./wait-for-it.sh db:5432 && ./wait-for-it.sh redis:6379 -- gunicorn backend.asgi:application --bind 0.0.0.0:9000 -w 1 -k uvicorn.workers.UvicornWorker
