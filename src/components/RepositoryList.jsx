import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} singleView={false} />
        </Pressable>
      )}
    />
  );
}

const RepositoryList = () => {

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading){
    return <h2>Loading...</h2>
  }

  return (
   <RepositoryListContainer repositories={data.repositories} />
  );
};

export default RepositoryList;