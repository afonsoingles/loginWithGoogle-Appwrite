import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_600SemiBold } from '@expo-google-fonts/red-hat-display';

const CornerImage = ({ subtitle, image }) => {
    let [fontsLoaded] = useFonts({
        RedHatDisplay_600SemiBold,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Image 
                source={image} 
                style={styles.image} 
            />
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: RFValue(10),
    },
    image: {
        height: RFValue(45),
        width: RFValue(45),
        resizeMode: 'contain',
        borderRadius: 100,
    },
    subtitle: {
        marginLeft: RFValue(10), 
        fontSize: RFValue(14),
        color: 'rgba(255, 255, 255, 0.63)',
        fontFamily: 'RedHatDisplay_600SemiBold',
        textAlign: 'center',
    },
});

export default CornerImage;