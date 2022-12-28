//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
  },
  appBar: {
    flexGrow: 1,
    backgroundColor: theme.appBar.backgroundColor,
    justifyContent: 'flex-end'
  },
  repositoryList: {
    flexGrow: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar/>
      </View>
      <View style={styles.repositoryList}>
        <RepositoryList />
      </View>
    </View>
  );
};

export default Main;