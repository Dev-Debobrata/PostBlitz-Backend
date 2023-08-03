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

data "aws_vpc" "default" {
  default = true
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
  vpc_id      = data.aws_vpc.default.id

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
  instance_type          = var.aws-instance-type
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
  vpc_id      = data.aws_vpc.default.id

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
  instance_type          = var.aws-instance-type
  count                  = 3
  key_name               = aws_key_pair.tf-key-pair.key_name
  vpc_security_group_ids = [aws_security_group.server.id]
  tags = {
    Name = "server-${count.index + 1}"
  }
}

# Load Balancer Security Group
resource "aws_security_group" "alb_sg" {
  name        = "alb_sg"
  description = "Allow HTTP & HTTPS"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
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
}

# Load Balancer
resource "aws_lb" "alb" {
  name            = "postblitz-load-balancer"
  subnets         = var.aws-subnet-id
  security_groups = [aws_security_group.alb_sg.id]
  internal        = false
}

# Load Balancer Listener for port 9001
resource "aws_lb_listener" "listener_9001" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Resource not found."
      status_code  = "404"
    }
  }
}


resource "aws_lb_listener_rule" "listener_rule_9001" {
  listener_arn = aws_lb_listener.listener_9001.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_9001.arn
  }

  condition {
    path_pattern {
      values = ["/api/users*"]
    }
  }
}

# Target Group 9001 attachment with the Load Balancer
resource "aws_lb_target_group" "tg_9001" {
  name        = "target-group-9001"
  port        = 9001
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "instance"
}

resource "aws_lb_target_group_attachment" "tg_attachment_9001-0" {
  target_group_arn = aws_lb_target_group.tg_9001.arn
  target_id        = aws_instance.server[0].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9001-1" {
  target_group_arn = aws_lb_target_group.tg_9001.arn
  target_id        = aws_instance.server[1].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9001-2" {
  target_group_arn = aws_lb_target_group.tg_9001.arn
  target_id        = aws_instance.server[2].id
}

# Load Balancer Listener for port 9002
resource "aws_lb_listener" "listener_9002" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Resource not found."
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "listener_rule_9002" {
  listener_arn = aws_lb_listener.listener_9002.arn
  priority     = 101

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_9002.arn
  }

  condition {
    path_pattern {
      values = ["/api/admins*"]
    }
  }
}

# Target Group 9002 attachment with the Load Balancer
resource "aws_lb_target_group" "tg_9002" {
  name        = "target-group-9002"
  port        = 9002
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "instance"
}

resource "aws_lb_target_group_attachment" "tg_attachment_9002-0" {
  target_group_arn = aws_lb_target_group.tg_9002.arn
  target_id        = aws_instance.server[0].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9002-1" {
  target_group_arn = aws_lb_target_group.tg_9002.arn
  target_id        = aws_instance.server[1].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9002-2" {
  target_group_arn = aws_lb_target_group.tg_9002.arn
  target_id        = aws_instance.server[2].id
}

# Load Balancer Listener for port 9003
resource "aws_lb_listener" "listener_9003" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Resource not found."
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "listener_rule_9003" {
  listener_arn = aws_lb_listener.listener_9003.arn
  priority     = 102

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_9003.arn
  }

  condition {
    path_pattern {
      values = ["/api/blogs*"]
    }
  }
}

# Target Group 9003 attachment with the Load Balancer
resource "aws_lb_target_group" "tg_9003" {
  name        = "target-group-9003"
  port        = 9003
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "instance"
}

resource "aws_lb_target_group_attachment" "tg_attachment_9003-0" {
  target_group_arn = aws_lb_target_group.tg_9003.arn
  target_id        = aws_instance.server[0].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9003-1" {
  target_group_arn = aws_lb_target_group.tg_9003.arn
  target_id        = aws_instance.server[1].id
}
resource "aws_lb_target_group_attachment" "tg_attachment_9003-2" {
  target_group_arn = aws_lb_target_group.tg_9003.arn
  target_id        = aws_instance.server[2].id
}
