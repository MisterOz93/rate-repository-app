//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  appBar: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.appBar.backgroundColor,
    justifyContent: 'flex-end'
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar/>
      </View> 
      <Routes>
        <Route path='/' element={<RepositoryList />} exact/>
        <Route path='/signIn' element={<SignIn/>} exact/>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;