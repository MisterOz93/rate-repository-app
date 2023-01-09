import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);

    const authStorage = useAuthStorage();

    

    const signIn = async ({ username, password }) => {
      const data = await mutate({variables: { credentials: { username, password } } })
      await authStorage.setAccessToken(data.data.authenticate.accessToken);
      return data;
    };
  
    return [signIn, result];
  };

  export default useSignIn;