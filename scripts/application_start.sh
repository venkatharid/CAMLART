#!/bin/bash

#login to ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 451158882614.dkr.ecr.eu-west-1.amazonaws.com


docker rmi -f $(docker images -a -q)

#Image pull from ECR hub
docker pull 451158882614.dkr.ecr.eu-west-1.amazonaws.com/covidapp_backend
docker run -d -p 5000:5000 451158882614.dkr.ecr.eu-west-1.amazonaws.com/covidapp_backend

#Image Pull from ECR 
docker pull 451158882614.dkr.ecr.eu-west-1.amazonaws.com/covidapp_frontend
docker run -d -p 3000:3000 451158882614.dkr.ecr.eu-west-1.amazonaws.com/covidapp_frontend
