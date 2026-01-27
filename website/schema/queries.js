import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation CreateUser($username: String!, $password: String!, $emailConsent: Boolean!) {
        createUser(username: $username, password: $password, emailConsent: $emailConsent) {
            value
            user {
                username
                id
                admin
                emailConsent
            }
        }
    }
`

export const ME = gql`
    query Me {
        me {
            id
            username
            admin
            phone
            about
            emailConsent
        }
    }
`

export const USERS = gql`
    query Users {
        users {
            admin
            id
            username
            phone
            about
            emailConsent
        }
    }
`

export const BLOGS = gql`
    query Blogs {
        blogs {
            id
            title
            subtitle
            content
            createdAt
        }
    }
`

export const LATEST_BLOGS = gql`
    query {
        latestBlogs {
            id
            title
            subtitle
            content
            createdAt
        }
    }
`

export const LOGIN = `
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`

export const DELETE_BLOG = gql`
    mutation deleteBlog($id: ID!) {
        deleteBlog(id: $id) {
            id
        }
    }
`

export const DELETE_MANY = gql`
    mutation DeleteMany($blogIds: [ID!]!) {
        deleteMany(blogIds: $blogIds) {
            deletedCount
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID, $admin: Boolean, $phone: String, $about: String, $emailConsent: Boolean) {
        updateUser(id: $id, admin: $admin, phone: $phone, about: $about, emailConsent: $emailConsent) {
            id
            admin
            phone
            about
            emailConsent
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($currentPassword: String!, $newPassword: String!, $token: String) {
        updatePassword(currentPassword: $currentPassword, newPassword: $newPassword, token: $token) {
            id
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation sendMessage($email: String!, $message: String!) {
        sendMessage(email: $email, message: $message) {
            id
            email
            message
            createdAt
        }
    }
`

export const NEW_BLOG = gql`
    mutation newBlog($title: String!, $subtitle: String, $content: String!) {
        newBlog(title: $title, subtitle: $subtitle, content: $content) {
            title
            subtitle
            content
            createdAt
        }
    }
`

export const UPDATE_BLOG = gql`
    mutation updateBlog($id: ID!, $title: String!, $subtitle: String, $content: String!) {
        updateBlog(id: $id, title: $title, subtitle: $subtitle, content: $content) {
            title
            subtitle
            content
        }
    }
`

export const GET_BLOG = gql`
    query getBlog($id: ID!) {
        getBlog(id: $id) {
            title
            subtitle
            content
            createdAt
        }
    }
`

export const GET_USER_MESSAGES = gql`
    query GetUserWithMessages($id: ID!) {
        user(id: $id) {
            id
            username
            messages {
                id
                email
                message
                createdAt
            }
        }
    }
`