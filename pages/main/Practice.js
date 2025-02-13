import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, processColor } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import ErrorMessage  from '../../components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import icon from '../../assets/logos/icon.png';
import CornerImage from '../../components/user/CornerImage';
import {API_URL} from '@env'
import Levels from '../../components/user/ProgressBar';
import NavigationBar from '../../components/NavBar';
import Button from '../../components/Button';
import axios from 'axios';
import { getUserData, getToken } from '../../utils/users/getData';
import { checkLoginStatus } from '../../utils/AuthManager';
import Loader from '../../pages/main/Loader';
import recycle_bin from '../../assets/icons/recycle_bin.png';
import water from '../../assets/icons/water.png';
import earth from '../../assets/icons/earth.png';
import random from '../../assets/icons/random.png';

const PracticeScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState('');
  const [error, setError] = useState('');
  // on/off
  const [isRecyclingDisabled, setIsRecyclingDisabled] = useState(false);
  const [isWaterDisabled, setIsWaterDisabled] = useState(false);
  const [isSustainabilityDisabled, setIsSustainabilityDisabled] = useState(false);
  const [isRandomDisabled, setIsRandomDisabled] = useState(false);

  // loading
  const [isRecyclingLoading, setIsRecyclingLoading] = useState(false);
  const [isWaterLoading, setIsWaterLoading] = useState(false);
  const [isSustainabilityLoading, setIsSustainabilityLoading] = useState(false);
  const [isRandomLoading, setIsRandomLoading] = useState(false);

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
    
    switch (theme) {
      case "reciclagem":
        setIsRecyclingDisabled(true);
        setIsRandomDisabled(true);
        setIsWaterDisabled(true);
        setIsSustainabilityDisabled(true);
        
        setIsRecyclingLoading(true);
        break;
      case "agua":
        setIsRecyclingDisabled(true);
        setIsRandomDisabled(true);
        setIsWaterDisabled(true);
        setIsSustainabilityDisabled(true);
        
        setIsWaterLoading(true);
        break;
      case "sustentabilidade":
        setIsRecyclingDisabled(true);
        setIsRandomDisabled(true);
        setIsWaterDisabled(true);
        setIsSustainabilityDisabled(true);
        
        setIsSustainabilityLoading(true);
        break;
      case "all":
        setIsRecyclingDisabled(true);
        setIsRandomDisabled(true);
        setIsWaterDisabled(true);
        setIsSustainabilityDisabled(true);
        
        setIsRandomLoading(true);
        break;
    }

    const token = ("Bearer " + (await getToken()));
    
   
    
    try {
      const request = await axios.get(`${API_URL}/v1/questions` , {
        headers: {
          authorization: token,
        },
        params: {
          theme: theme,
        }
      });

      const sessionInfo = {
        theme: theme,
        replied_questions: 0,
        response: [],
      }
      navigation.navigate("QuestionsRoutes", { screen: 'Main', params: {userInfo: userInfo, questionsData: request.data, sessionInfo: sessionInfo}});

    } catch (error) {
      setIsRandomDisabled(true);
      setIsRecyclingDisabled(true);
      setIsWaterDisabled(true);
      setIsSustainabilityDisabled(true);
      setIsRandomLoading(false);
      setIsRecyclingLoading(false);
      setIsWaterLoading(false);
      setIsSustainabilityLoading(false);

      setError("Pedimos desculpa, mas parece que algo correu mal. Por favor, tente novamente mais tarde.");

      setTimeout(() => {
        setIsRandomDisabled(false);
        setIsRecyclingDisabled(false);
        setIsWaterDisabled(false);
        setIsSustainabilityDisabled(false);
        setError('');
      }, 5000);
    }

    // ao clicar, desativar todos os botoes e redirecionar para pagina de questoes com loading ao centro. depois fazer a request e carregar os dados. no final enquanto submete para a api, aparece um ddrumroll e dps a screen de resultados. animaçções entre perguntas.
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
          <Button text="Reciclagem" onButtonClicked={() => StartQuestionSession("reciclagem")} width="48%" imageSource={recycle_bin} isButtonDisabled={isRecyclingDisabled} isLoading={isRecyclingLoading}/>
          <Button text="Água" onButtonClicked={() => StartQuestionSession("agua")} width="48%" imageSource={water} isButtonDisabled={isWaterDisabled} isLoading={isWaterLoading}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: RFPercentage(2) }}>
          <Button text="Sustentabilidade" onButtonClicked={() => StartQuestionSession("sustentabilidade")} width="48%" imageSource={earth} isButtonDisabled={isSustainabilityDisabled} isLoading={isSustainabilityLoading}/>
          <Button text="Aleatório" onButtonClicked={() => StartQuestionSession("all")} width="48%" imageSource={random} isButtonDisabled={isRandomDisabled} isLoading={isRandomLoading}/>
        </View>

      </View>
      <View style={[{width: '80%', alignSelf: 'center', marginTop: RFPercentage(4)}]}>
        <ErrorMessage text={error} isVisible={error !== ''}/>
      </View>
      
      
      <View style={[{bottom: RFValue(20), position: 'absolute', width: '50%', alignSelf: 'center'}]}>
        <NavigationBar tab={"practice"} userInfo={userInfo}/>
      </View>
    </BackgroundWrapper>
  );
};



export default PracticeScreen;
