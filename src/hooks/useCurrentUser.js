import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrentUser = () => {

    const { data, loading, ...result } = useQuery(CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
    });

    return({
        user: data?.me,
        loading,
        ...result,
    })

}

export default useCurrentUser;