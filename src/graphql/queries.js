import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String){
    repositories(first: 6 after: $after orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
      reviews {
        edges {
          node {
            createdAt
            rating
            repository {
              fullName
            }
            text
          }
        }
      }
    }
  }`

export const GET_REPOSITORY = gql `
query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
}`
