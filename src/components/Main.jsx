//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUpForm from './SignUpForm';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  appBar: {
    backgroundColor: theme.appBar.backgroundColor,
    justifyContent: 'space-evenly',
    zIndex: 2,
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
        <Route path='/repository/:id' element={<SingleRepository />} exact/>
        <Route path='/review' element={<ReviewForm />} exact/>
        <Route path='/userReviews' element={<UserReviews />} exact />
        <Route path='/signUp' element={<SignUpForm />} exact/>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;