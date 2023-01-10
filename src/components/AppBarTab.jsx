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
      marginLeft: 'auto',
      zIndex: 0.5,
    }
  });

const AppBarTab = ({label, handlePress}) => {

  const signInOutTab = label === 'Sign In' || label === 'Sign Out' && styles.signUpFlex

  let destination = '/'
  
  if (label === 'Sign In'){
    destination = '/signIn'
  }

  if (label === 'Sign Out'){
    
    return(
      <Pressable style={signInOutTab} onPress={() => handlePress()}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    )
  }

  return (
    
    <Pressable style={signInOutTab}>
      <Link to={destination}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </Pressable>
  )
} 

export default AppBarTab