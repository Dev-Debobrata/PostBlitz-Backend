variable "aws-subnet-id" {
  type = set(string)
  default = [
    "subnet-06ce9f6ae14522898",
    "subnet-0d0bfb7d146652373",
    "subnet-0eae5ae006267a2d5"
  ]
}

variable "aws-instance-type" {
  type    = string
  default = "t2.micro"
}
