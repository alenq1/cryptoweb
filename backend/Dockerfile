# Set the image version and source os
ARG PYTHON_VBASE=3.7.4-slim-buster
ARG PYTHON_VFINAL=3.7.4-slim-buster
ARG SCENARIO
#Download the image to create a initial builder
FROM python:$PYTHON_VBASE as base
ARG SCENARIO
#RUN echo "Build scenario: ${SCENARIO}"
#Install the python libriaries into requirements folder

COPY requirements/* /
#create wheels directory for compiled libraries
RUN pip install --upgrade pip \
    && pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r ${SCENARIO}.txt
##    && pip install --install-option="--prefix=/install" -r /$SCENARIO.txt


#ADD ../config/ /config


## If you want to create additional folders
#    && mkdir -p /backend/static \
#    && mkdir -p /backend/media
# 
#######Final Base Image

FROM python:$PYTHON_VFINAL as final
ARG SCENARIO
#RUN echo "Build scenario FIANLLLLLLLLLLLLLLLL: ${SCENARIO}"
#Enviroment to python image
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
#Install curl for healthcheck in this image
RUN apt-get update \  
    && apt-get install --no-install-recommends --no-install-suggests -y curl gcc \
    python3-dev python3-twisted libbz2-dev libxml2-dev libxslt1-dev zlib1g-dev libffi-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/*    
#Copy wheels directory from builder image to final image
COPY --from=base /wheels /wheels
COPY --from=base $SCENARIO.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

#Create a new user for execute the container instead root for security purposes
RUN groupadd app && useradd -g app app
RUN mkdir -p /backend  /backend/media /backend/static \
    && chown -R app:app /backend 
WORKDIR /backend
ADD . /backend

RUN touch /backend/requirements/temporal 
RUN pip install -r /backend/requirements/temporal 

#ENV PORT 8000
#EXPOSE $PORT
USER app
#ENTRYPOINT [ "entrypoint.sh" ]

###############################################