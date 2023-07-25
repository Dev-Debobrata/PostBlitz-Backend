terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


provider "aws" {
  region  = "ap-south-1"
  profile = "default"
}

# Key Pair Generation
resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "tf-key-pair" {
  key_name   = "tf-key-pair.pem"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "local_file" "tf-key" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "tf-key-pair.pem"
}

# Ansible Security Group
resource "aws_security_group" "ansible" {
  name        = "ansible"
  description = "Allow SSH"
  vpc_id      = "vpc-04bdcfbb9286ed26d"

  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description = "HTTP"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ansible"
  }
}

# Ansible Control instance EC2
resource "aws_instance" "ansible" {
  ami                    = "ami-0f5ee92e2d63afc18"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.tf-key-pair.key_name
  vpc_security_group_ids = [aws_security_group.ansible.id]
  user_data              = file("userData.sh")
  tags = {
    Name = "ansible"
  }
}

# Server Security Group
resource "aws_security_group" "server" {
  name        = "server"
  description = "Allow SSH"
  vpc_id      = "vpc-04bdcfbb9286ed26d"

  ingress {
    description     = "SSH from VPC"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.ansible.id]
  }

  ingress {
    description = "HTTP from 9001"
    from_port   = 9001
    to_port     = 9001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from 9002"
    from_port   = 9002
    to_port     = 9002
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from 9003"
    from_port   = 9003
    to_port     = 9003
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "HTTP"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "server"
  }
}

# Server EC2
resource "aws_instance" "server" {
  ami                    = "ami-0f5ee92e2d63afc18"
  instance_type          = "t2.micro"
  count                  = 3
  key_name               = aws_key_pair.tf-key-pair.key_name
  vpc_security_group_ids = [aws_security_group.server.id]
  tags = {
    Name = "server-${count.index + 1}"
  }
}
