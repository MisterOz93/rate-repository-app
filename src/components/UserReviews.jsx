import { FlatList, View, StyleSheet } from "react-native";
import useCurrentUser from "../hooks/useCurrentUser";
import { ReviewItem } from "./SingleRepository";

const styles = StyleSheet.create({
    separator: {
        height: 10,
      },
})


const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const {user, loading } = useCurrentUser();

    if (loading){
        return( <h3>Loading...</h3>)
    }
    console.log('user is', user)

    const reviews = user ? user.reviews.edges.map(edge => edge.node) : [];
    console.log('reviews', reviews)

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