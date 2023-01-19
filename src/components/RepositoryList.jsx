import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import RepositoryListHeader from './RepositoryListHeader';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  container: {
    marginBottom: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, orderCriteria, setOrderCriteria, query, setQuery, onEndReach }) => {

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const navigate = useNavigate();

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => 
        <RepositoryListHeader 
          orderCriteria={orderCriteria} 
          setOrderCriteria={setOrderCriteria}
          query={query}
          setQuery={setQuery} 
        /> 
      }
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} singleView={false} />
        </Pressable>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
    />
  );
}

const RepositoryList = () => {

  const [orderCriteria, setOrderCriteria] = useState('Latest Repositories');
  const [query, setQuery] = useState(''); //use in GET_REPOSITORIES query


  const orderBy = orderCriteria === 'Latest Repositories' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = orderCriteria === 'Lowest Rated Repositories' ? 'ASC' : 'DESC';

  const { repositories, loading, fetchMore }  = useRepositories({orderBy, orderDirection, searchKeyword: query })

  /*const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {orderBy, orderDirection, searchKeyword: query }
  }); */

  const onEndReach = () => {
    fetchMore();
  };

  
  if (loading){
    return <h2>Loading...</h2>
  }
 
  return (
    <RepositoryListContainer
      repositories={repositories}
      orderCriteria={orderCriteria} 
      setOrderCriteria={setOrderCriteria}
      query={query}
      setQuery={setQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;