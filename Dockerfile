ARG NAMESPACE
FROM registry.cloud.okteto.net/${NAMESPACE}/hello:latest

USER root
RUN npm install nodemon --global

USER app