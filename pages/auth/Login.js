import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import BackgroundWrapper from '../../components/old/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { loginAccount } from '../../utils/ButtonHandlers';
import ErrorMessage from '../../components/ErrorMessage';
import { account } from '../../utils/AppwriteManager';

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_600SemiBold,
  });

  
  const navigation = useNavigation();
  if (!fontsLoaded) return null;


  const processLogin = async () => {
    setIsButtonLoading(true);
    setErrorMessage('');
    const loginProcess = await loginAccount(emailInput, passwordInput);
    if (loginProcess === "signedIn") {
      setIsButtonLoading(false);
      AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Home');
      
      
    } else {
      setIsButtonLoading(false);
      console.log("Error logging in: ",loginProcess);
      switch (loginProcess) {
        case "general_argument_invalid":
          setErrorMessage("Email ou password inválidos.");
          break;
        case "user_invalid_credentials":
          setErrorMessage("Email ou password inválidos.");
          break;
        case "user_blocked":
          setErrorMessage("Utilizador bloqueado.");
          break;
        case "email_not_verified":
          AsyncStorage.setItem('isLoggedIn', 'true');
          
          // IMPLEMENT ACCOUNT VERIFICATION
          break;
        case "user_session_already_exists":
          const accountData = await account.get();
          if (accountData.emailVerification === false) {
            AsyncStorage.setItem('isLoggedIn', 'true');
            // IMPLEMENT ACCOUNT VERIFICATION
          } else {
            navigation.navigate('Home');
          }
          break;
        default:
          setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente ou contacte o suporte.");
          setTimeout(() => {setErrorMessage('');}, 3500);
          break;
      }
    }
  };

  return (
    <BackgroundWrapper>
      <HeaderBig subtitle="Sign in" />

      <View style={styles.container}>
        
        <View style={styles.inputContainers}>
          <InputBox placeholder='Username' icon={require('../../assets/icons/user.png')} onChangeText={(text) => setEmailInput(text)} />
          <InputBox placeholder='Password' icon={require('../../assets/icons/key.png')} isPassword={true} onChangeText={(text) => setPasswordInput(text)} />
        </View>
        <View style={styles.submitButton}>
          <Button 
            text={isButtonLoading ? "" : "Entrar"} 
            onButtonClicked={() => !isButtonLoading && processLogin()} 
            isLoading={isButtonLoading} 
            isButtonDisabled={isButtonLoading}
          />
        </View>
        <View style={{ marginTop: RFPercentage(2.5)}}>
          <ErrorMessage isVisible={true} text={errorMessage}/>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainers: {
    marginTop: RFValue(30),
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
    gap: RFValue(15),
  },
  submitButton: {
    marginTop: RFValue(35),
    width: '85%',
    alignSelf: 'center',
  },
});


export default LoginScreen;
