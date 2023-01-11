import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn  from '../components/SignIn';

describe('SignInForm', () => {
    it('Calls the onSubmit function when submit is pressed', async () => {

       const onSubmit= jest.fn();
        const {getByPlaceholderText, getByText} = render(<SignIn submitHandler={onSubmit}/>)
        fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.press(getByText('Sign In'));
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'kalle',
                password: 'password'
            })
        })
    })
})