import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TextInput from './TextInput';
import theme from "../theme";
import { Feather, Entypo } from "@expo/vector-icons";
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: "80%",
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.itemBackground,
        marginBottom: 10,
    },

    searchBar: {
        ...theme.inputField,
        margin: 0,
        width: "80%",
        borderStyle: 'none',
    },
});

const SearchBar = ({ query, setQuery }) => {

    const [clicked, setClicked] = useState(false);
    const [text, setText ] = useState(query)

    useEffect(() => {
        debounced(text)
    }, [text])
    const debounced = useDebouncedCallback(
        (input) => {
            setQuery(input)
        },
        700
    );

    return(
        <View style={styles.container}>
             <Feather
                name="search"
                size={20}
                color="black"
                style={{ marginLeft: 10}}
            />
            <TextInput style={styles.searchBar} 
                autoFocus='autoFocus'
                placeholder='Search Repositories List...' 
                placeholderTextColor='gray' 
                onChangeText={setText}
                value={text}
                onFocus={() => setClicked(true)} 
            />
            {clicked && <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setQuery("");
              setClicked(false);
            }}/> 
            }
        </View>
    )
};

export default SearchBar;