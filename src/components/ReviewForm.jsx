import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

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

    errorText: {
        color: theme.colors.errorText,
    }

})

const FormikForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput style={styles.input} name='ownerName' placeholder='Repository owner name' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='repositoryName' placeholder='Repository name' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='rating' placeholder='Rating between 0 and 100' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='text' placeholder='Review' placeholderTextColor="gray" multiline/>
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' style={styles.submitButton}>Create a review</Text>
            </Pressable>
        </View>
    )

}

const ReviewForm = () => {

    const [createReview] = useCreateReview();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
    }


    const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Repository owner name is required'),
        repositoryName: yup.string().required('Repository name is required'),
        rating: yup.number().required('Rating is required').min(0).max(100).typeError('Rating must be a valid number.'),
      })

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, text } = values;

        const rating = +values.rating;

        try {
            const { data } = await createReview({ownerName, repositoryName, rating, text});
            navigate(`/repository/${data.createReview.repositoryId}`);
        } catch (e) {
            setError(`Error: ${e.message}`);
            setTimeout(() => {
                setError(null);
            }, 6000)
        }
    }
    return (
        <View style={styles.topLevelContainer}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({ handleSubmit }) => <FormikForm onSubmit={handleSubmit}/> }
            </Formik>
            {error && <Text fontWeight='bold' style={styles.errorText}>{error}</Text>}
        </View>
    )
};

export default ReviewForm;