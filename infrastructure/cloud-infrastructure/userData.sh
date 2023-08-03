#!/bin/bash

sudo apt update -y
sudo apt install -y python3-pip
sudo pip install ansible
ansible-galaxy collection install community.docker