import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {

    const [mutate, result] = useMutation(ADD_REVIEW);
    const apolloClient = useApolloClient();

    const createReview = async ({  ownerName, repositoryName, rating, text }) => {
        const data = await mutate({ variables: { review: { ownerName, repositoryName, rating, text }}});
        apolloClient.resetStore;
        return data;   
    };

    return [createReview, result];

};

export default useCreateReview;