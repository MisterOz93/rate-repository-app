import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

//import theme from '../theme';
import AppBarTab from './AppBarTab';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    paddingRight: 10
  },
});

const AppBar = () => {
  return(
    <View style={styles.container}>
      <AppBarTab label={'Repositories'}/>
      <AppBarTab label={'Sign In'} />
    </View>
  );
};

export default AppBar;