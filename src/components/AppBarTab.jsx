import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
    text: {
      color: theme.appBar.textColor,
      fontWeight: theme.fontWeights.bold,
      font: theme.fonts.main,
      marginTop: 30,
      marginLeft: 20,
      fontSize: theme.fontSizes.subheading
    }
  });

const AppBarTab = ({label}) => (<Pressable><Text style={styles.text}>{label}</Text></Pressable>)

export default AppBarTab