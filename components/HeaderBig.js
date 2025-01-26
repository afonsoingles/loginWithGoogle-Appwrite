import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HeaderImage from '../assets/logos/icon.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_600SemiBold } from '@expo-google-fonts/red-hat-display';

const HeaderBig = ({ subtitle }) => {
    let [fontsLoaded] = useFonts({

        RedHatDisplay_600SemiBold,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Image 
                source={HeaderImage} 
                style={styles.image} 
            />
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        
    },
    image: {
        height: RFValue(100),
        width: RFValue(100),
        resizeMode: 'contain',
        borderRadius: 100, 
    },
    subtitle: {
        marginTop: RFValue(10), 
        fontSize: RFValue(16), 
        color: 'rgba(255, 255, 255, 0.63)',
        fontFamily: 'RedHatDisplay_600SemiBold',
        textAlign: 'center', 

    },
});

export default HeaderBig;