#!/bin/sh

./wait-for-it.sh redis:6379 -- celery -A backend worker -l info