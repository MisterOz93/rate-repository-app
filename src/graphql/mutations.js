import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
    mutation AuthenticateUser($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }`

export const ADD_REVIEW = gql`
    mutation AddReview($review: CreateReviewInput) {
        createReview(review: $review) {
          repositoryId
        }
      }`

export const ADD_USER = gql`
    mutation AddUser($user: CreateUserInput) {
        createUser(user: $user) {
            username
        }
    }`

export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }  
`