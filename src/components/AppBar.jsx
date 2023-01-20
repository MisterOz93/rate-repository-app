import { View, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
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

  
  const [currentUser, setCurrentUser] = useState(null)

  const {data, loading} = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network'
  })

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (data) {
      setCurrentUser(data.me)
    }
  
  },[data, loading])

  if (loading) {
    return <h2>Loading...</h2>
  }
  

  const signOut = async () => {
      
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  
  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label={'Repositories'}/>
      { !currentUser &&
        <>
          <AppBarTab label={'Sign Up'} />
          <AppBarTab label={'Sign In'} />
        </>
      }
      { currentUser &&
        <>
          <AppBarTab label={'Create a Review'} />
          <AppBarTab label={'My Reviews'} />
          <AppBarTab label={'Sign Out'} handlePress={signOut} />
        </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;