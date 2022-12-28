import { View, Image, StyleSheet } from "react-native";
import Text from './Text'
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.itemBackground,
    },

    headerContainer: {
        flexDirection: "row",
    },
    
    headerTextContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        flex: 1,
        flexWrap: 'wrap'
    },

    countsContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },

    textMargins: {
        marginBottom: 5,
    },

    
    languageStyles: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.languageText,
        width: 'fit-content',
        borderRadius: 3,
        padding: 5,
        marginTop: 10,
        marginBottom: 15,
    },

    imageStyles: {
        width: theme.imageSizes.small,
        height: theme.imageSizes.small,
        marginLeft: 10,
        marginTop: 10,
    }
})

const CountItem = ({label, value}) => {

    const formatValue = (num) => {

      let newNum = num;
      if (num >= 1000) {
        //divide num by 1k, take num until 1st decimal place, then add 'k'
        newNum /= 1000;
        newNum = newNum.toFixed(1)
        newNum = "" + newNum + 'k'
      }
      return newNum
    }
    
    return(
        <View>
            <Text fontWeight={'bold'}>{formatValue(value)}</Text>
            <Text color={'textSecondary'}>{label}</Text>
        </View>
    )
}

const RepositoryItem = (item) => {
    const {fullName, description, language, stargazersCount, ratingAverage, forksCount, reviewCount, ownerAvatarUrl } = item.item;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.imageStyles} source={ownerAvatarUrl}/>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.textMargins} fontWeight={'bold'}>{fullName}</Text>
                    <Text style={styles.textMargins} color={'textSecondary'}>{description}</Text>
                    <Text style={styles.languageStyles}>{language} </Text>
                </View>
            </View>
            <View style={styles.countsContainer}>
                <CountItem label='Stars' value={stargazersCount}/>
                <CountItem label='Forks' value={forksCount} />
                <CountItem label='Reviews' value={reviewCount} />
                <CountItem label='Rating' value={ratingAverage} />
            </View>
        </View>
    )
};

export default RepositoryItem;