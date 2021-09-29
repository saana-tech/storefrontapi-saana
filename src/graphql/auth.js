import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation AuthenticationControllerMutation($input: AuthInput) {
    authenticationController(input: $input) {
      token
    }
  }
`;
export const createNewUserGraphQL = gql`
  mutation Mutation($input: UserInputClient) {
    createNewUserClientController(input: $input) {
      token
    }
  }
`;
export const validateDocumentInput = gql`
  mutation Mutation($input: ValidateInputDocument) {
    validateDocumentUser(input: $input) {
      error
      message
    }
  }
`;
export const getQueryUser = gql`
  query Query {
    getUser {
      _id
      create
      document
      email
      firstName
      img_url
      phone
      refs
      role
      type_document
    }
  }
`;

export const queryAffiliationActive = gql`
  query Query {
    handleGetAffiliationUser {
      active
      id
    }
  }
`;
