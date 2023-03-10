import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      mainBackground: '#e1e4e8',
      itemBackground: 'white',
      languageText: 'white',
      formBackground: 'white',
      signInButtonText: 'white',
      borderColor: 'gray',
      errorText: '#d73a4a',
      dropdownMenu: '#F0F0F0',
      dropdownText: 'black',
      dropdownCancel: '#989898',
      deleteReviewButton: 'red',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        ios: 'Arial',
        android: 'Roboto',
        default: 'System' 
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    imageSizes: {
      small: 50,
      large: 200
    },
    appBar: {
      backgroundColor: '#24292e',
      textColor: '#F8F8F8'
    },
    inputField: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      padding: 10,
    }
  };
  
  export default theme;