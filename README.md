# PostBlitz

A full-stack blogging site project.

<br />

## Installation

1. Clone the repository

```bash
  git clone https://github.com/Dev-Destructor/PostBlitz-Backend.git
```

2. Change the working directory

```bash
  cd PostBlitz
```

3. Add the following environment variables in your docker-compose file (Use it only for development we have a infrastructure folder build for usage in production using ansible and terraform)

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

4. Run `docker-compose up` to start the project.

<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)

<Br/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<Br/>

## Authors

- [Dev-Destructor](https://www.github.com/Dev-Destructor)
