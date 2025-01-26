import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, processColor } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { account } from '../../utils/AppwriteManager';
const HomeScreen = () => {

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState('');
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_600SemiBold,
  });

  
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
    const checkLoginStatus = async () => {
      console.log('Checking login status');
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        try {
          const _account = await account.get();
          
        } catch (error) {
          console.log('User is not logged in');
          await AsyncStorage.setItem('loggedIn', 'false');
          navigation.navigate('AuthRoutes', { screen: 'Login' });
          return "loggedOut";
        }
        console.log('User is already logged in');
        navigation.navigate('MainRoutes', { screen: 'Home' });
        return "loggedIn";
      } else {
        navigation.navigate('AuthRoutes', { screen: 'Login' });
      }
    };

    const getAccountInfo = async () => {
      const accountData = await account.get();
      
      setAccountInfo(accountData.email);
    }


    const loginStatus = await checkLoginStatus();
    
    if (loginStatus === "loggedIn") {getAccountInfo();}


    })();
  }, []);

  if (!fontsLoaded) return null;


  const processLogout = async () => {
    setIsButtonLoading(true);
    await AsyncStorage.setItem('loggedIn', 'false');
    try {await account.deleteSessions('current');} catch(e){}
      
    setIsButtonLoading(false);
    navigation.navigate('AuthRoutes', { screen: 'Login' });
  }
  
  return (
    <BackgroundWrapper>
      <HeaderBig subtitle="Yay! Logged in :)" />
      <Text style={{fontFamily: 'RedHatDisplay_400Regular', fontSize: RFValue(15), textAlign: 'center', marginTop: RFValue(10)}}>{accountInfo}</Text>
      <View style={styles.container}>
        
        <View style={styles.submitButton}>
          <Button 
            text={isButtonLoading ? "" : "Logout"} 
            onButtonClicked={() => !isButtonLoading && processLogout()} 
            isLoading={isButtonLoading} 
            isButtonDisabled={isButtonLoading}
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


export default HomeScreen;
