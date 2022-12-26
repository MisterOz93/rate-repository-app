import { Text, View } from "react-native";

const RepositoryItem = (item) => {
    const {fullName, description, language, stargazersCount, ratingAverage, forksCount, reviewCount} = item.item;

    return (
        <View>
            <Text>Full Name: {fullName}</Text>
            <Text>Description: {description}</Text>
            <Text>Language: {language} </Text>
            <Text>Stars: {stargazersCount}</Text>
            <Text>Forks: {forksCount}</Text>
            <Text>Reviews: {reviewCount}</Text>
            <Text>Rating: {ratingAverage}</Text>
        </View>
    )
};

export default RepositoryItem;