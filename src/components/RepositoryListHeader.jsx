import { View, StyleSheet, Pressable, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Text from "./Text";
import { useState } from "react";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.dropdownMenu,
        //add more style
    },

   modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
   },

   modalContent: {
    height: 300,
    width: 300,
    //add more style to picker & items
   }
});

const RepositoryListHeader = ({ orderCriteria, setOrderCriteria }) => {

    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    const itemPressHandler = (criteria) => {
        setOrderCriteria(criteria);
        closeModal();
        closeMenu();
    }
    
    return (
            <View style={styles.container}>
            <Pressable onPress={openModal}><Text>Sort Repositories By:</Text></Pressable>
                <Modal transparent animationType='fade' visible={showModal} style={styles.modal}> 
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={orderCriteria}
                                onValueChange={(itemValue) =>
                                itemPressHandler(itemValue)}
                            >
                                <Picker.Item label="Most Recent" value="latest" />
                                <Picker.Item label="Highest Rated" value="highest" />
                                <Picker.Item label="Lowest Rated" value="lowest" />
                            </Picker>
                        </View>
                    </View>      
                </Modal>
            </View>    
    )
};

export default RepositoryListHeader;