#!/bin/bash

#login to ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 950568811506.dkr.ecr.eu-west-1.amazonaws.com


docker rmi -f $(docker images -a -q)

#Image pull from ECR hub
docker pull 950568811506.dkr.ecr.eu-west-1.amazonaws.com/profileconnector_backend
docker run -d -p 5000:5000 --name backend 950568811506.dkr.ecr.eu-west-1.amazonaws.com/profileconnector_backend

#Image Pull from ECR 
docker pull 950568811506.dkr.ecr.eu-west-1.amazonaws.com/profileconnector_frontend
docker run -d -p 3000:3000 --link backend 950568811506.dkr.ecr.eu-west-1.amazonaws.com/profileconnector_frontend
