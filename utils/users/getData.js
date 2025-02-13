import { account,  databases} from '../../utils/AppwriteManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  const accountData = await account.get();

  const cachedUserStorage = await AsyncStorage.getItem('userStorage');
  const cachedLevelsConfig = await AsyncStorage.getItem('levelsConfig');
  const cacheTimestamp = await AsyncStorage.getItem('cacheTimestamp');
  const now = Date.now();

  let userStorage, levelsConfig;

  if (cachedUserStorage && cachedLevelsConfig && cacheTimestamp && (now - cacheTimestamp < 10 * 60 * 1000)) {
    console.log("Using cached data");
    userStorage = JSON.parse(cachedUserStorage);
    levelsConfig = JSON.parse(cachedLevelsConfig);
  } else {
    userStorage = await databases.getDocument('UserData', 'userStorage', accountData.$id);
    levelsConfig = await databases.getDocument('UserData', 'levelsConfig', userStorage.level);

    await AsyncStorage.setItem('userStorage', JSON.stringify(userStorage));
    await AsyncStorage.setItem('levelsConfig', JSON.stringify(levelsConfig));
    await AsyncStorage.setItem('cacheTimestamp', now.toString());
  }

  const data = {
    accountData,
    userStorage,
    levelsConfig
  };

  return data;
}

export const getToken = async () => {
  const cachedToken = await AsyncStorage.getItem('authToken');
  const cacheTimestamp = await AsyncStorage.getItem('tokenCacheTimestamp');
  const now = Date.now();

  if (cachedToken && cacheTimestamp && (now - cacheTimestamp < 1 * 60 * 1000)) {
    console.log("Using cached token");
    return cachedToken.toString();
  } else {
    const token = await account.createJWT();
    await AsyncStorage.setItem('authToken', token.jwt);
    await AsyncStorage.setItem('tokenCacheTimestamp', now.toString());
    
    return token.jwt.toString();
  }
}