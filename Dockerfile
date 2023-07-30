FROM node:latest

USER root
RUN apt-get update \
  && apt-get install -y git curl \
  && npm install -g yarn \
  && curl -fsSL https://get.docker.com -o get-docker.sh \
  && sh get-docker.sh \
  && usermod -aG docker jenkins

USER jenkins
