FROM registry.cloud.okteto.net/faas-rberrelleza/hello:latest

USER root
RUN npm install nodemon --global

USER app