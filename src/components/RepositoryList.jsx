import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import RepositoryListHeader from './RepositoryListHeader';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, orderCriteria, setOrderCriteria }) => {

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryListHeader orderCriteria={orderCriteria} setOrderCriteria={setOrderCriteria} />}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} singleView={false} />
        </Pressable>
      )}
    />
  );
}

const RepositoryList = () => {

  const [orderCriteria, setOrderCriteria] = useState('Latest Repositories');


  const orderBy = orderCriteria === 'Latest Repositories' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = orderCriteria === 'Lowest Rated Repositories' ? 'ASC' : 'DESC';

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {orderBy, orderDirection}
  });

  if (loading){
    return <h2>Loading...</h2>
  }

  return (
   <RepositoryListContainer repositories={data.repositories} orderCriteria={orderCriteria} setOrderCriteria={setOrderCriteria} />
  );
};

export default RepositoryList;