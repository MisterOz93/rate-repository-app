import { View, StyleSheet, Pressable, Modal, TouchableOpacity, } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Text from "./Text";
import SearchBar from './SearchBar';
import { useState } from "react";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.dropdownMenu,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingBottom: 15,
        marginTop: 15,
        marginBottom: 10,
    },

    headerButton: {
        marginBottom: 10,
    },

   modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   },

   modalHeader: {
    backgroundColor: theme.colors.itemBackground,
    height: 50,
    width: "100%",
    textAlign: 'center',

   },

   modalContent: {
    height: 300,
    width: 300,
   },

   picker: {
    borderStyle: 'none',
    height: 100,
   },

   cancelOption: {
    color: theme.colors.dropdownCancel,
   },
});

const RepositoryListHeader = ({ orderCriteria, setOrderCriteria, query, setQuery }) => {

    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const closeMenu = () => setShowMenu(false);

    const itemPressHandler = (criteria) => {
        if (criteria !== 'cancel') {
            setOrderCriteria(criteria);  
        }

        closeModal();
        closeMenu();
    }
    
    return (
            <View style={styles.container}>
                <SearchBar query={query} setQuery={setQuery} />
                <Text style={styles.headerButton}>Click To Sort Repositories By:</Text>
                <Pressable onPress={openModal}><Text>{orderCriteria} </Text></Pressable>
                <Modal transparent animationType='fade' visible={showModal} style={styles.modal}> 
                    <TouchableOpacity style={styles.modalContainer} onPress={() => { closeModal()} }>
                        <TouchableOpacity style={styles.modalContent} onPress={() => {}} activeOpacity={1} >
                            <Text style={styles.modalHeader}>Sort Repositories By:</Text>
                            <Picker
                                selectedValue={orderCriteria}
                                onValueChange={(itemValue) =>
                                itemPressHandler(itemValue)}
                                mode='dialog'
                                style={styles.picker}
                            >   
                                <Picker.Item label="Cancel" value='cancel' color={styles.cancelOption.color}/>
                                <Picker.Item label="Latest" value="Latest Repositories" />
                                <Picker.Item label="Highest Rated" value="Highest Rated Repositories" />
                                <Picker.Item label="Lowest Rated" value="Lowest Rated Repositories" />
                            </Picker>
                        </TouchableOpacity>
                    </TouchableOpacity>     
                </Modal>
            </View>    
    )
};

export default RepositoryListHeader;