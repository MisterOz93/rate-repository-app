import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
            createdAt
            description
            forksCount
            fullName
            id
            language
            name
            openIssuesCount
            ownerAvatarUrl
            ownerName
            ratingAverage
            watchersCount
            reviewCount
            stargazersCount
            url
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }`

export const GET_REPOSITORY = gql `
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId){
      createdAt
      description
      forksCount
      fullName
      id
      language
      name
      openIssuesCount
      ownerAvatarUrl
      ownerName
      ratingAverage
      watchersCount
      reviewCount
      stargazersCount
      url
    }
  }`
