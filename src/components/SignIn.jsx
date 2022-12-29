import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    signIn: {
        flexGrow: 1,
        color: theme.colors.languageText
    }
})

const SignIn = () => {
  return(
    <View style={styles.signIn}>
        <Text>The sign in view</Text>
    </View>
  )
};

export default SignIn;