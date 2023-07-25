# !/bin/bash
read -p "Enter your EC2 IP: " ip

sudo chmod 400 ./cloud-infrastructure/tf-key-pair.pem

scp -r -i ./cloud-infrastructure/tf-key-pair.pem ./postblitz-role/* ubuntu@$ip:/home/ubuntu/postblitz/postblitz-role
scp -i ./cloud-infrastructure/tf-key-pair.pem ./system_config.yaml ubuntu@$ip:/home/ubuntu/postblitz/
scp -i ./cloud-infrastructure/tf-key-pair.pem ./ansible.cfg ubuntu@$ip:/home/ubuntu/postblitz/
scp -i ./cloud-infrastructure/tf-key-pair.pem ./inventory ubuntu@$ip:/home/ubuntu/postblitz/
scp -i ./cloud-infrastructure/tf-key-pair.pem ./secrets.env ubuntu@$ip:/home/ubuntu/postblitz/
scp -i ./cloud-infrastructure/tf-key-pair.pem ./cloud-infrastructure/tf-key-pair.pem ubuntu@$ip:/home/ubuntu/postblitz/
