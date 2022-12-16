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
  cd PostBlitz-Backend
```

3. Run `docker-compose up` to start the server.

<br />

# 1. Frontend

<br/>

# 2. Backend

## Dependencies

- Express
- aws-sdk
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- express-rate-limit
- helmet
- jsonwebtoken
- mongodb
- mongoose
- multer
- multer-s3
- nodemailer
- redis
- uuid
- winston
- zod
- Eslint
- Prettier
- Nodemon
- Typescript
- Docker

<br />

## Features

- User Authentication
- User Authorization
- User Registration
- User Login
- User Password Reset
- User Password Update
- User Email Update
- User Profile Update
- User Profile Picture Update
- User Profile Picture Delete
- User Profile Picture Get
- User Profile Get
- User Profile Delete
- Blog Post Create
- Blog Post Update
- Blog Post Delete
- Blog Post Get
- Blog Post Get All
- Blog Post Get All By User
- Blog Post Get All By Category
- Admin Login

<Br />

## API Documentation

### User Routes

1. **POST** `/api/users/register`

```bash
{
  "name": "",
  "username": "",
  "password": "",
  "email": "",
  "address": "",
  "pincode": "",
  "country": ""
}
```

2. **POST** `/api/users/login`

```bash
{
  "username": "",
  "password": "",
}
```

3. **PATCH** `/api/users/update/password`

```bash
{
  "password": "",
  "newPassword": ""
}
```

4. **PATCH** `/api/users/update/details`

```bash
{
  "name": "",
  "username": "",
  "email": "",
  "address": "",
  "pincode": "",
  "country": ""
}
```

5. **PATCH** `/api/users/update/image`

```bash
  image as form-data
```

6. **PATCH** `/api/users/update/like`

```bash
  {
    "likedBlog": ""
  }
```

7. **GET** `/api/users/username/${username}`

```bash
  username as param
```

<br />

### Blog Routes

1. **POST** `/api/blogs/create`

```bash
{
  "title": "",
  "description": "",
  "content": "",
  "category": "",
  image as from data
}
```

2. **PATCH** `/api/blogs/update/${_id}`

```bash
{
  _id as param
  "title": "",
  "description": "",
  "content": "",
  "category": "",
}
```

3. **DELETE** `/api/blogs/delete/${blogId}`

```bash
  blogId as param
```

4. **GET** `/api/blogs`
5. **GET** `/api/blogs/id/${_id}`

```bash
  id as param
```

6. **GET** `/api/blogs/title/${title}`

```bash
  title as param
```

7. **GET** `/api/blogs/category/${category}`

```bash
  category as param
```

<Br />

### Admin Routes

1. **POST** `/api/admin/login`

```bash
{
  "username": "",
  "password": ""
}
```

<Br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)

<Br/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<Br/>

## Authors

- [@Dev-Destructor](https://www.github.com/Dev-Destructor)
