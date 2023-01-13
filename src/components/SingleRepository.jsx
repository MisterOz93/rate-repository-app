import { FlatList, View, Text, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: theme.colors.itemBackground,
    },

    reviewHeader: {
        flexDirection: 'row ',
    },

    reviewRating: {
        borderStyle: 'solid',
        borderColor: theme.colors.borderColor,
    },

    reviewAuthorAndDate: {

    },

    separator: {
        height: 10,
      },
})

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({review}) =>  {
    //console.log('review passed to reviewItem is', review)
    const reviewDateArr = review.createdAt.split('-');
    const months = {'01': 'Jan', '02': 'Feb', '03': 'March', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July',
                     '08': 'Aug', '09': 'Sept', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
    const reviewDate = `${months[reviewDateArr[1]]}.${reviewDateArr[2].substring(0, 2)}.${reviewDateArr[0]}`;

    return(
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewRating}>
                    <Text>{review.rating}</Text>
                </View>
                <View style={styles.reviewAuthorAndDate}>
                    <Text>{review.user.username}</Text>
                    <Text>{reviewDate}</Text>
                </View>
            </View>
            <Text>{review.text}</Text>
        </View>
    )
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
            ItemSeparatorComponent={ItemSeparator}
        />
    )
}

export default SingleRepository;