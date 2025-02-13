import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HeaderBig from '../../components/HeaderBig';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold, RedHatDisplay_600SemiBold } from '@expo-google-fonts/red-hat-display';
import { useNavigation } from '@react-navigation/native';
import QuestionsProgress from '../../components/questions/Progress';
import CornerImage from '../../components/user/CornerImage';
import {API_URL} from '@env'
import Levels from '../../components/user/ProgressBar';
import NavigationBar from '../../components/NavBar';
import Button from '../../components/Button';
import QuestionButton from '../../components/questions/QuestionButton';
import { getUserData, getToken } from '../../utils/users/getData';
import { checkLoginStatus } from '../../utils/AuthManager';
import Loader from '../../pages/main/Loader';
import logout from '../../assets/icons/logout.png';

const Main = ({ route }) => {
  const [params, setParams] = useState(route.params ?? {}); // Inicializa com um objeto vazio se route.params for undefined
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const navigation = useNavigation();

  const getRandomUnrepliedQuestion = () => {
    if (!params.questionsData) return; 
    const unrepliedQuestions = Array.isArray(params.questionsData) ? params.questionsData.filter(question => !question.replied) : [];
    
    if (unrepliedQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * unrepliedQuestions.length);
      setCurrentQuestion(unrepliedQuestions[randomIndex]);
    }
  };


  const ReplyToQuestion = async (questionId, answer) => {
  }

  useEffect(() => {
    if (route.params && route.params.questionsData) {
      const updatedQuestions = route.params.questionsData.questions.map(question => ({
        ...question,
        replied: question.replied || false,
      }));
      
      setParams(prev => ({ ...prev, questionsData: updatedQuestions }));
    }
  }, [navigation]);

  useEffect(() => {
    if (params.questionsData) {
      getRandomUnrepliedQuestion();
    }
  }, [params]);

  if (!params.questionsData) return <Loader />;

  return (
    <BackgroundWrapper>
      <View style={{ marginTop: 40, marginLeft: 20 }}>
        <Button
          imageSource={logout}
          text={"Voltar"}
          width={RFValue(150)}
          onButtonClicked={() => navigation.navigate("MainRoutes", { screen: "Home" })}
        />
      </View>
      <View style={{ position: 'absolute', top: 10, right: 40, width: '30%' }}>
        <QuestionsProgress progress={params.sessionInfo?.replied_questions ?? 0} maxProgress={15} />
      </View>
      <View style={{ width: '70%', alignSelf: 'center', marginTop: RFPercentage(7) }}>
        {currentQuestion && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'RedHatDisplay_600SemiBold',
            color: "#fff",
            fontSize: RFValue(16)
          }}>
            {currentQuestion.question}
          </Text>
        )}
      </View>
      <View style={{ width: '80%', alignItems: 'left', alignSelf: 'center', marginTop: RFPercentage(4) }}>
        {currentQuestion && (
          <>
            <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_700Bold', color: "#fff", fontSize: RFValue(14) }]}>Opções:</Text>
            <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_600SemiBold', color: "#fff", fontSize: RFValue(13) }]}> A - {currentQuestion.options.A}</Text>
            <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_600SemiBold', color: "#fff", fontSize: RFValue(13) }]}> B - {currentQuestion.options.B}</Text>
            <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_600SemiBold', color: "#fff", fontSize: RFValue(13) }]}> C - {currentQuestion.options.C}</Text>
            <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_600SemiBold', color: "#fff", fontSize: RFValue(13) }]}> D - {currentQuestion.options.D}</Text>
          </>
        )}
      </View>
      <View style={{ width: '80%', alignSelf: 'center', marginTop: RFPercentage(5) }}>
        <Text style={[{ textAlign: 'center', fontFamily: 'RedHatDisplay_700Bold', color: "#fff", fontSize: RFValue(14) }]}>Qual das seguintes opções está correta?</Text>
      </View>
      <View style={{ alignSelf: 'center', marginTop: RFPercentage(4), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <QuestionButton text={"A"} width={RFValue(40)} height={RFValue(40)} />
        <View style={{ width: RFValue(15) }} />
        <QuestionButton text={"B"} width={RFValue(40)} height={RFValue(40)} />
        <View style={{ width: RFValue(15) }} />
        <QuestionButton text={"C"} width={RFValue(40)} height={RFValue(40)} />
        <View style={{ width: RFValue(15)}} />
        <QuestionButton text={"D"} width={RFValue(40)} height={RFValue(40)} />
      </View>

    </BackgroundWrapper>
  );
};

export default Main;
