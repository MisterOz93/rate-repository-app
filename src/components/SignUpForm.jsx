import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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
    },

});

const FormikForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput style={styles.input} name='username' placeholder='Username' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='password' secureTextEntry placeholder='Password' placeholderTextColor="gray"/>
            <FormikTextInput style={styles.input} name='passwordConfirmation' secureTextEntry placeholder='Password confirmation' placeholderTextColor='gray' />
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' style={styles.submitButton}>Sign Up</Text>
            </Pressable>
        </View>
    )

}

const SignUpForm = () => {

    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: '',
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required').min(1).max(30),
        password: yup.string().required('Password is required').min(5).max(50),
        passwordConfirmation: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], "Passwords don't match."),
      });


    const onSubmit = ( values ) => {
        const {username, password, passwordConfirmation } = values; //remove pw conf when done debugging
        console.log('after sign up, values are', username, password, passwordConfirmation);
        //try sign up then try sign in
    }

    return(
        <View style={styles.topLevelContainer}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({handleSubmit}) => <FormikForm onSubmit={handleSubmit}/> }
            </Formik>
        </View>
    )

};

export default SignUpForm;
