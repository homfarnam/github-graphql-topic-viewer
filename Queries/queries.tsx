import gql from "graphql-tag"

export const REACT_REPOS = gql`
  query($search_term: String!, $after: String) {
    search(query: $search_term, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            forkCount
            url
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
    }
  }
`
