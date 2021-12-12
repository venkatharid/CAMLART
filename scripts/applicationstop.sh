#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
docker kill $(docker ps -q)
docker rmi -f $(docker images -a -q)
docker container prune --force
sudo service docker stop