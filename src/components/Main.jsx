//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

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

  const [signIn] = useSignIn();
  const navigate = useNavigate();
  
  const signInHandler = async (values) => {
    const { username, password } = values;
    
    try {
      await signIn({ username, password } );
      navigate('/');
      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar/>
      </View> 
      <Routes>
        <Route path='/' element={<RepositoryList />} exact/>
        <Route path='/signIn' element={<SignIn submitHandler={signInHandler}/>} exact/>
        <Route path='/repository/:id' element={<RepositoryItem singleView />} exact/>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;