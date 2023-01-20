import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (variables) => {

    const { data, loading, ...result } = useQuery(CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
        variables,
    });

    return({
        user: data?.me,
        loading,
        ...result,
    })

}

export default useCurrentUser;