import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
const styles = StyleSheet.create({
    
    topLevelContainer: {
        flex: 5,
        backgroundColor: theme.colors.formBackground,
        marginBottom: 30,
    },

    input: {
        ...theme.inputField,
        borderColor: theme.colors.borderColor,
    },

    submitButton: {
      borderWidth: 1,
      padding: 10,
      margin: 10,
      textAlign: 'center',
      backgroundColor: theme.colors.primary,
      color: theme.colors.signInButtonText,
    },

})

const FormikForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput style={styles.input} name='repoOwner' placeholder='Repository owner name' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='repoName' placeholder='Repository name' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='rating' placeholder='Rating between 0 and 100' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='reviewText' placeholder='Review' placeholderTextColor="gray"/>
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' style={styles.submitButton}>Create a review</Text>
            </Pressable>
        </View>
    )

}

const ReviewForm = () => {
    const initialValues = {
        repoOwner: '',
        repoName: '',
        rating: '',
        reviewText: '',
    }

    const validationSchema = yup.object().shape({
        repoOwner: yup.string().required('Repository owner name is required'),
        repoName: yup.string().required('Repository name is required'),
        rating: yup.number().required('Rating is required')
      })

    const onSubmit = () => {
        console.log('clicked')
    }
    return (
        <View style={styles.topLevelContainer}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({ handleSubmit }) => <FormikForm onSubmit={handleSubmit}/> }
            </Formik>
        </View>
    )
};

export default ReviewForm;