export type IUser = {
    id: String,
    name: String,
    username: String,
    password: String,
    image: String,
    email: String,
    address: String,
    pincode: Number,
    country: String,
    blogs: {
        blogID: String
    }
}

export type IBlogs = {
    id: String,
    user: {
        username: String,
    },
    title: String,
    description: String,
    content: String,
    images: String,
    hyperlinks: String,
    likes: Number,
    shareLink: string,
}
