import { useMutation, useApolloClient } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";


const useSignUp = () => {

    const [mutate, result] = useMutation(ADD_USER);

    const apolloClient = useApolloClient();

    const signUp = async ({ username, password }) => {
      const data = await mutate({ variables: { user: { username, password } } });
      apolloClient.resetStore();
      return data;
    };
  
    return [signUp, result];
  };

  export default useSignUp;