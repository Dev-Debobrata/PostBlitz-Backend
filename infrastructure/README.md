# This is the server infrastructure for the Postblitz project.

## Requirements

> AWS Account
> Terraform CLI

## Setup

1. Go to cloud-infrastructure folder and run:

```bash
terraform init
terraform apply
```

2. Return to infrastructure folder create secrets.env and add the following env variables:

```env
  REDIS_URL: redis://redis:6379
  MONGO_URL: MONGO_URL
  AUTH_EMAIL: EMAIL_ADDRESS_FOR_NODEMAILER
  AUTH_PASS: PASSWORD_FOR_NODEMAILER
  USER_ACCESS_TOKEN_SECRET: userAceessTokenSecret
  ADMIN_ACCESS_TOKEN_SECRET: adminAccessTokenSecret
  USER_REFRESH_TOKEN_SECRET: userRefreshTokenSecret
  AWS_S3_BUCKET_NAME: YOUR_AWS_BUCKET_NAME
  AWS_S3_BUCKET_REGION: YOUR_AWS_BUCKET_REGION
  AWS_S3_BUCKET_ACCESS_KEY_ID: YOUR_AWS_BUCKET_ACCESS_KEY_ID
  AWS_S3_BUCKET_SECRET_ACCESS_KEY: YOUR_AWS_BUCKET_SECRET_ACCESS_KEY
```

3. Log in to your EC2 instance using ssh and run:

```bash
ssh -i ./cloud-infrastructure/tf-key-pair.pem ubuntu@<your-ec2-instance-public-ip>
```

4. Create two directories:

```bash
mkdir postblitz
cd postblitz
mkdir postblitz-role
```

5. return to infrastructure directory and run:

```bash
sudo chmod +x fileSender.sh
./fileSender.sh
```

5. Go to Postblitz folder in the EC2 instance and add private ip of the servers under [servers] in inventory file.

6. Now make tf-key-pair.pem executable:

```bash
sudo chmod 400 tf-key-pair.pem
```

7. Run ansible playbook:

```bash
ansible-playbook system-config.yaml
```
