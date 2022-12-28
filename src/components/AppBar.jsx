import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  text: {
    color: theme.appBar.textColor,
    fontWeight: theme.fontWeights.bold,
    font: theme.fonts.main,
    marginBottom: 35,
    marginLeft: 20,
    fontSize: theme.fontSizes.subheading
  }
});

const AppBar = () => {
  return <View style={styles.container}><AppBarTab label={'Repositories'} style={styles.text}/></View>;
};

export default AppBar;