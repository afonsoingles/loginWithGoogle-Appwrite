import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { LoginWithGoogle } from '../../utils/AuthManager';
import GoogleIcon from '../../assets/icons/google.png';


const LoginScreen = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_600SemiBold,
  });

  
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log('Checking login status');
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        console.log("might be logged in");
        try {
          const _account = await account.get();
          
        } catch (E) {
          console.log('User is not logged in');
          await AsyncStorage.setItem('loggedIn', 'false');
          navigation.navigate('AuthRoutes', { screen: 'Login' });
          return;
        }
        console.log('User is already logged in');
        navigation.navigate('MainRoutes', { screen: 'Home' });
      } else {
        console.log("NOT logged in");
        navigation.navigate('AuthRoutes', { screen: 'Login' });
      }
    };

    checkLoginStatus();
  }, []);

  if (!fontsLoaded) return null;

  const processLogin = async () => {
    setIsButtonLoading(true);
    const loginProcess = await LoginWithGoogle();
     if (loginProcess === true) {
      
      await AsyncStorage.setItem('loggedIn', 'true');
      setIsButtonLoading(false);
      navigation.navigate('MainRoutes', { screen: 'Home' });
     } else {
      
      setIsButtonLoading(false);
  
    }

    



  };

  return (
    <BackgroundWrapper>
      <HeaderBig subtitle="Olá, bem vindo!" />

      <View style={styles.container}>
        
        <View style={styles.submitButton}>
          <Button 
            text={isButtonLoading ? "" : "Login com Google"} 
            onButtonClicked={() => !isButtonLoading && processLogin()} 
            isLoading={isButtonLoading} 
            isButtonDisabled={isButtonLoading}
            imageSource={GoogleIcon}
          />
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
