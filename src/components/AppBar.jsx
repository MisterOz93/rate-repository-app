import { View, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView horizontal>
        <AppBarTab label={'Repositories'}/>
        <AppBarTab label={'Sign In'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;