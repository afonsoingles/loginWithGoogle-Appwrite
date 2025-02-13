import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold, RedHatDisplay_300Light } from '@expo-google-fonts/red-hat-display';
import { useNavigation } from '@react-navigation/native';
import icon from '../../assets/logos/icon.png';
import CornerImage from '../../components/user/CornerImage';
import Levels from '../../components/user/ProgressBar';
import DidYouKnow from '../../components/widgets/DidYouKnow';
import DailyStats from '../../components/widgets/DailyStats';
import NavigationBar from '../../components/NavBar';
import Button from '../../components/Button';
import { getUserData } from '../../utils/users/getData';
import { checkLoginStatus } from '../../utils/AuthManager';
import Loader from '../../pages/main/Loader';


const HomeScreen = () => {

  const [userInfo, setUserInfo] = useState('');
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_600SemiBold,
  });

  const navigation = useNavigation();



  useEffect(() => {
    const handleFocus = async () => {
      const loginStatus = await checkLoginStatus();
      if (loginStatus === "loggedIn") {
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

  


  
  return (
    <BackgroundWrapper>
      <View style={[{ marginTop: 20, marginLeft: 20 }]}>
        <CornerImage subtitle={`Olá, ${userInfo.accountData.name}!`} image={icon} />
      </View>
      <View style={[{ position: 'absolute', top: 20, right: 20, width: '30%' }]}>
        <Levels level={1} progress={userInfo.userStorage.points} maxProgress={userInfo.levelsConfig.max_points}/>
      </View>
      <View style={[{width: '70%', alignSelf: 'center', marginTop: RFPercentage(12)}]}>
        <DidYouKnow text={"deves colocar papel no ecoponto azul"}/>
      </View>
      <View style={[{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: RFPercentage(1)}]}>
        <View style={[{width: '45%'}]}>
          <DailyStats title={"Hoje"} value={"ERROR"} description={"perguntas respondidas corretamente"}/>
        </View>
      </View>
      
      <View style={[{bottom: RFValue(20), position: 'absolute', width: '50%', alignSelf: 'center'}]}>
        <NavigationBar tab={"home"} userInfo={userInfo}/>
      </View>
      

    </BackgroundWrapper>
  );
};



export default HomeScreen;
