import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';


const styles = StyleSheet.create({
    container: {
        flexGrow: 13,
        backgroundColor: theme.colors.formBackground,
    },

    input: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      padding: 10,
    },
    signInButton: {
      borderWidth: 1,
      padding: 10,
      margin: 10,
      textAlign: 'center',
      backgroundColor: theme.colors.primary,
      color: theme.colors.signInButtonText,
    }
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' style={styles.input} placeholder="Username" placeholderTextColor="gray"/>
      <FormikTextInput name='password' style={styles.input} secureTextEntry placeholder="Password" placeholderTextColor="gray"/>
      <Pressable onPress={onSubmit} >
        <Text fontWeight='bold' style={styles.signInButton}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: ''
}

const SignIn = ({submitHandler}) => {
 /* moved to Main and passed as submitHandler
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      await signIn({ username, password } );
      navigate('/');
      
    } catch (e) {
      console.log(e);
    }
  }
 */
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is Required'),
    password: yup.string().required('Password is Required')
  })

  return(
    <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={validationSchema}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
        </Formik>
    </View>
  )
};

export default SignIn;