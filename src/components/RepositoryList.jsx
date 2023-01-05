import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryList = () => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  if (loading){
    return <h2>Loading...</h2>
  }

  const repositoryNodes = data ? data.repositories.edges.map(edge => edge.node) : []

  console.log(repositoryNodes)

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;