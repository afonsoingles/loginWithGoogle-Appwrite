import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_600SemiBold } from '@expo-google-fonts/red-hat-display';
import { ScrollView } from 'react-native-gesture-handler';

const DidYouKnow = ({ text }) => {
    let [fontsLoaded] = useFonts({
        RedHatDisplay_600SemiBold,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sabias que...</Text>
            <View style={styles.factContainer}>
                {text.length > 50 ? (
                    <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.factText}>{text}</Text>
                    </ScrollView>
                ) : (
                    <Text style={styles.factText}>{text}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5),
    },
    title: {
        color: '#FFF',
        fontSize: RFValue(14),
        fontFamily: 'RedHatDisplay_600SemiBold',
        marginBottom: RFValue(5),
    },
    factContainer: {
        backgroundColor: '#242424',
        borderRadius: RFValue(12),
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(10),
    },
    factText: {
        color: '#929292',
        fontSize: RFValue(14),
        fontFamily: 'RedHatDisplay_600SemiBold',
        
    },
});

export default DidYouKnow;
