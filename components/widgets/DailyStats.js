import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_600SemiBold, RedHatDisplay_400Regular } from '@expo-google-fonts/red-hat-display';

const DailyStats = ({ title, value, description }) => {
    let [fontsLoaded] = useFonts({
        RedHatDisplay_600SemiBold,
        RedHatDisplay_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(10),
    },
    title: {
        color: '#FFF',
        fontSize: RFValue(14),
        fontFamily: 'RedHatDisplay_600SemiBold',
        marginBottom: RFValue(10),
    },
    statsContainer: {
        backgroundColor: '#242424',
        borderRadius: RFValue(12),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: RFValue(20),
    },
    value: {
        color: '#FFF',
        fontSize: RFValue(50),
        fontFamily: 'RedHatDisplay_600SemiBold',
        marginBottom: RFValue(10),
    },
    description: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: RFValue(14),
        fontFamily: 'RedHatDisplay_400Regular',
        textAlign: 'center',
    },
});

export default DailyStats;
