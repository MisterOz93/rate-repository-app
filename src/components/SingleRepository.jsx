import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: theme.colors.itemBackground,
    },

    reviewHeader: {
        flexDirection: 'row ',
    },

    reviewRating: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 15,
        height: 30,
        width: 30,
        borderColor: theme.colors.primary,
        margin: 5,
        marginRight: 15,
    },

    reviewNumber: {
        margin: 'auto',
        color: theme.colors.primary,
    },

    reviewAuthorAndDate: {
        marginTop: 5,

    },

    reviewText: {
        marginLeft: 50,
        marginTop: 5,
        marginBottom: 10,
        marginRight: 10,
    },

    reviewButtonsContainer: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'space-around',
    },

    viewRepositoryButton: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        paddingHorizontal: 20,
    },

    deleteReviewButton: {
        backgroundColor: theme.colors.deleteReviewButton,
        padding: 10,
        paddingHorizontal: 20,

    },

    buttonText: {
        color: theme.colors.signInButtonText,
    },

    separator: {
        height: 10,
      },
})

const ItemSeparator = () => <View style={styles.separator} />;


export const ReviewItem = ({review, userReviewsView=false}) =>  {

    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const formatReviewDate = (reviewDate) => {
        const reviewDateArr = reviewDate.split('-');
        const months = {'01': 'Jan', '02': 'Feb', '03': 'March', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July',
                         '08': 'Aug', '09': 'Sept', '10': 'Oct', '11': 'Nov', '12': 'Dec'};
    
        return`${months[reviewDateArr[1]]}.${reviewDateArr[2].substring(0, 2)}.${reviewDateArr[0]}`;
    
    }
    
    
    const reviewDate = formatReviewDate(review.createdAt);

    const viewRepositoryHandler = () => {
        navigate(`/repository/${review.repository.id}`)
    }

    const deleteReviewHandler = () => {

        Alert.alert('Confirmation', 'Are you sure you want to delete this review?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async () => {
                try {
                    await deleteReview(review.id);
                } catch(e) {
                    console.log(e)
                }
            }},
        ]);


    };


    return(
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewRating}>
                    <Text fontWeight='bold' style={styles.reviewNumber}>{review.rating}</Text>
                </View>
                <View style={styles.reviewAuthorAndDate}>
                    <Text fontWeight='bold'>{ !userReviewsView && review.user.username} {userReviewsView && review.repository.fullName}</Text>
                    <Text color='textSecondary'>{reviewDate}</Text>
                </View>
            </View>
            <View style={styles.reviewText}>
                <Text>{review.text}</Text>
            </View>
            { userReviewsView && 
            <View style={styles.reviewButtonsContainer}>
                <Pressable onPress={viewRepositoryHandler} style={styles.viewRepositoryButton}>
                    <Text fontWeight='bold' style={styles.buttonText}>View Repository</Text>
                </Pressable>
                <Pressable onPress={deleteReviewHandler} style={styles.deleteReviewButton}>
                    <Text fontWeight='bold' style={styles.buttonText}>Delete Review</Text>
                </Pressable>    
            </View>}
        </View>
    )
}

const SingleRepository = () => {
    const { id } = useParams();

    const { repository, loading, fetchMore } = useRepository({ repositoryId: id, first: 2 });

    if (loading) {
        return (
            <h3>Loading...</h3>
        )
    }
    const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

    const onEndReach = () => {
        fetchMore({
            first: 2
        });
    };

    return(
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} singleView/>}
            ItemSeparatorComponent={ItemSeparator}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReach}
        />
    )
}

export default SingleRepository;