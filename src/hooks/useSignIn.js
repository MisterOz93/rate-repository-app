import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);
  
    const signIn = async ({ username, password }) => {
      const data = await mutate({variables: { credentials: { username, password } } })
      return data;
    };
  
    return [signIn, result];
  };

  export default useSignIn;