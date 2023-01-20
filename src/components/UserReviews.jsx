import { FlatList, View } from "react-native";
import Text from "./Text";


const UserReviews = ({ user }) => {
    //get reviews by user

    return(
        <View>
            <Text>Hello {user}. Ill add your reviews in a minute.</Text>
        </View>
    )
};

export default UserReviews;