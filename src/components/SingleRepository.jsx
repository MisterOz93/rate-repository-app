import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";


const ReviewItem = ({review}) =>  {
    console.log('review passed to reviewItem is', review)
    return <h2>Hi</h2>
}

const SingleRepository = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId: id }
    })

    if (loading) {
        return (
            <h3>Loading...</h3>
        )
    }
    const repository = data.repository;
    const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

    return(
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} singleView/>}
        />
    )
}

export default SingleRepository;