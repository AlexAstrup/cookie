FROM python:3.10-slim-buster

ARG MLFLOW_TRACKING_DIRECTORY
ENV MLFLOW_TRACKING_DIRECTORY=${MLFLOW_TRACKING_DIRECTORY}

COPY requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

RUN mkdir -p ${MLFLOW_TRACKING_DIRECTORY}/tracking
RUN mkdir -p ${MLFLOW_TRACKING_DIRECTORY}/artifacts

CMD mlflow server \
    --backend-store-uri ${MLFLOW_BACKEND_URI} \
    --default-artifact-root ${MLFLOW_TRACKING_DIRECTORY}/artifacts \
    --host 0.0.0.0 \
    --port 5000

