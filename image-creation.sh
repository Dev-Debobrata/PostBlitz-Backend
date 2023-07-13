# !/bin/bash

############################################

# Author : Debobrata Pal
# Date : 10/07/2020
# Description : This script will create a new image from the existing image and will push it to the docker hub

############################################

read -rp  "Enter the version of the image you want to create: " version
echo

read -rp "Enter your Docker Hub / Amazon ECR username: " username
echo

read -rsp "Enter your Docker Hub / Amazon ECR  password: " password
echo

echo "############################################"

docker login --username $username --password $password

echo "############################################"
echo "creating User image"
echo "############################################"

cd ./server/user
docker build --no-cache -t destructor98/postblitz-api-user:$version .

docker push destructor98/postblitz-api-user:$version

echo "############################################"
echo "creating Admin image"
echo "############################################"

cd ../admin

docker build --no-cache -t destructor98/postblitz-api-admin:$version .
docker push destructor98/postblitz-api-admin:$version

echo "############################################"
echo "creating Blog image"
echo "############################################"

cd ../blog
docker build --no-cache -t destructor98/postblitz-api-blog:$version .
docker push destructor98/postblitz-api-blog:$version

echo "############################################"
echo "Finished creating images"