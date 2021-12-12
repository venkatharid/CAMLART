#!/bin/bash

#download docker
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
#create our working directory if it doesnt exist
DIR="/home/ec2-user/covid19"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

