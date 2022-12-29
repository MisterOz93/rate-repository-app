import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    text: {
      color: theme.appBar.textColor,
      fontWeight: theme.fontWeights.bold,
      font: theme.fonts.main,
      marginTop: 30,
      marginLeft: 20,
      fontSize: theme.fontSizes.subheading
    },
    signUpFlex: {
      marginLeft: 'auto'
    }
  });

const AppBarTab = ({label}) => {
  const signInTab = label === 'Sign In' && styles.signUpFlex

  let destination = '/'
  if (label === 'Sign In'){
    destination = '/signIn'
  }
  return (
    <Pressable style={signInTab}>
      <Link to={destination}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </Pressable>
  )
} 

export default AppBarTab