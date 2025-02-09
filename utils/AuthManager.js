import { makeRedirectUri } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser';
import { account } from './AppwriteManager';
import { OAuthProvider } from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




// LOGIN WITH GOOGLE ACCOUNT
export async function LoginWithGoogle() {


    try {
        const deepLink = new URL(makeRedirectUri({preferLocalhost: true}));
        if (!deepLink.hostname) {
            deepLink.hostname = 'localhost';
        }
        const scheme = `${deepLink.protocol}//`; 

        const loginUrl = await account.createOAuth2Token(
            OAuthProvider.Google,
            `${deepLink}`,
            `${deepLink}`,
        );
        

        const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);
        

        const url = new URL(result.url);
        const secret = url.searchParams.get('secret');
        const userId = url.searchParams.get('userId');
        
        try {await account.deleteSessions('current');} catch(e){}
        const session = await account.createSession(userId, secret);
       
        if (session) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error: ", error);
        return false;
    }
    



}


export const processLogout = async () => {
  const navigation = useNavigation();
  await AsyncStorage.setItem('loggedIn', 'false');
  try {await account.deleteSessions('current');} catch(e){}
    
  navigation.navigate('AuthRoutes', { screen: 'Login' });

}

export const checkLoginStatus = async () => {
  console.log('Checking login status');
  const loggedIn = await AsyncStorage.getItem('loggedIn');
  
  if (loggedIn === 'true') {
    try {
      const _account = await account.get();
    } catch (error) {
      console.log('User is not logged in');
      await AsyncStorage.setItem('loggedIn', 'false');
      return "loggedOut";
    }
    console.log('User is already logged in');
    return "loggedIn";
  } else {
    return "loggedOut";
  }
};
