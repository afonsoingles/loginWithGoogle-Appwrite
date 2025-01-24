import { Client, Account, OAuthProvider } from "appwrite";
import { makeRedirectUri } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser';



// LOGIN WITH GOOGLE ACCOUNT
export async function LoginWithGoogle() {
    const deepLink = new URL(makeRedirectUri({preferLocalhost: true}));
    if (!deepLink.hostname) {
        deepLink.hostname = 'localhost';
    }
    const scheme = `${deepLink.protocol}//`; 

    const loginUrl = await account.createOAuth2Token(
        provider,
        `${deepLink}`,
        `${deepLink}`,
    );
    
    // Open loginUrl and listen for the scheme redirect
    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);
    
    // Extract credentials from OAuth redirect URL
    const url = new URL(result.url);
    const secret = url.searchParams.get('secret');
    const userId = url.searchParams.get('userId');
    
    // Create session with OAuth credentials
    await account.createSession(userId, secret);

}