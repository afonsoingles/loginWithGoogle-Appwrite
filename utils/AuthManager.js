import { makeRedirectUri } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser';
import { account } from './AppwriteManager';
import { OAuthProvider } from 'react-native-appwrite';



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