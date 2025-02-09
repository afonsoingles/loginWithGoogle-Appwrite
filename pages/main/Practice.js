import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, processColor } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import icon from '../../assets/logos/icon.png';
import CornerImage from '../../components/user/CornerImage';
import { account } from '../../utils/AppwriteManager';
import Levels from '../../components/user/ProgressBar';
import NavigationBar from '../../components/NavBar';
import Button from '../../components/Button';
import { getUserData } from '../../utils/users/getData';
import { checkLoginStatus } from '../../utils/AuthManager';
import Loader from '../../pages/main/Loader';
import recycle_bin from '../../assets/icons/recycle_bin.png';
import water from '../../assets/icons/water.png';
import earth from '../../assets/icons/earth.png';
import random from '../../assets/icons/random.png';

const PracticeScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState('');
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_600SemiBold,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const handleFocus = async () => {
      setUserInfo(route.params);
      const loginStatus = await checkLoginStatus();
      if (loginStatus === "loggedIn" && !userInfo) {
        const info = await getUserData();
        setUserInfo(info);
      } else {
        navigation.navigate('AuthRoutes', { screen: 'Login' });
      }
    };

    const unsubscribe = navigation.addListener('focus', handleFocus);
    return unsubscribe;
  }, [navigation]);

  if (!fontsLoaded || !userInfo) return <Loader />;

  const StartQuestionSession = async (theme) => {

    // passar o theme. retorna o sessionId (salvar em cache) + questoes.
  }

  return (
    <BackgroundWrapper>
      <View style={[{ marginTop: 20, marginLeft: 20 }]}>
        <CornerImage subtitle={`Olá, ${userInfo.accountData.name}!`} image={icon} />
      </View>
      <View style={[{ position: 'absolute', top: 20, right: 20, width: '30%' }]}>
        <Levels level={1} progress={userInfo.userStorage.points} maxProgress={userInfo.levelsConfig.max_points}/>
      </View>

      

      <View style={[{width: '70%', alignSelf: 'center', marginTop: RFPercentage(14)}]}>
        <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_600SemiBold', color: "#fff", fontSize: RFValue(16)}]}>Pratique os seus conhecimentos!</Text>
      </View>

      <View style={[{width: '80%', alignSelf: 'center', marginTop: RFPercentage(4)}]}>
        <Text style={[{ textAlign: 'left', fontFamily: 'RedHatDisplay_600SemiBold', color: "rgba(255, 255, 255, 0.5)", fontSize: RFValue(14)}]}>Para começar, escolha um tema:</Text>
      </View>

      <View style={[{width: '80%', alignSelf: 'center', marginTop: RFPercentage(4)}]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button text="Reciclagem" onPress={() => navigation.navigate('Tema1')} width="48%" imageSource={recycle_bin}/>
          <Button text="Água" onPress={() => navigation.navigate('Tema2')} width="48%" imageSource={water}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: RFPercentage(2) }}>
          <Button text="Sustentabilidade" onPress={() => navigation.navigate('Tema3')} width="48%" imageSource={earth}/>
          <Button text="Aleatório" onPress={() => navigation.navigate('Tema4')} width="48%" imageSource={random}/>
        </View>
      </View>

      <View style={[{bottom: RFValue(20), position: 'absolute', width: '50%', alignSelf: 'center'}]}>
        <NavigationBar tab={"practice"} userInfo={userInfo}/>
      </View>
    </BackgroundWrapper>
  );
};



export default PracticeScreen;
