import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import useCurrentUser from "../hooks/useCurrentUser";
import { ReviewItem } from "./SingleRepository";

const styles = StyleSheet.create({
    separator: {
        height: 10,
      },
})


const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {

    const {user, loading } = useCurrentUser({includeReviews: true});

    if (loading){
        return( <h3>Loading...</h3>)
    }

    const reviews = user ? user.reviews.edges.map(edge => edge.node) : [];

    if (reviews.length === 0){
        return(
            <View>
                <Text>Leave Reviews on Repositories to see them here.</Text>
            </View>
        )
    }

    return(
        <View>
            <FlatList 
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} userReviewsView/>} 
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    )
};

export default UserReviews;