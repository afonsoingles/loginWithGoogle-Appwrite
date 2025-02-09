import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts, RedHatDisplay_600SemiBold } from '@expo-google-fonts/red-hat-display';

const ProgressBar = ({ level, progress, maxProgress }) => {
    let [fontsLoaded] = useFonts({
        RedHatDisplay_600SemiBold,
    });

    if (!fontsLoaded) return null;

    const progressWidth = Math.min((progress / maxProgress) * 100, 100);
    console.log(progressWidth);
    return (
        <View style={styles.container}>
            <Text style={styles.levelText}>Nível {level}</Text>
            <View style={styles.progressContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${progressWidth}%` },
                    ]}
                />
                <View style={styles.progressInfo}>
                    <View style={styles.textWithIcon}>
                        <Text style={styles.progressText}>
                            {progress}/{maxProgress}
                        </Text>
                        <Image
                            source={require('../../assets/icons/leaf.png')} 
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: RFValue(10),
    },
    levelText: {
        color: '#FFF',
        fontSize: RFValue(14),
        marginBottom: RFValue(5),
        fontFamily: 'RedHatDisplay_600SemiBold',
    },
    progressContainer: {
        width: '100%',
        height: RFValue(25),
        backgroundColor: '#242424',
        borderRadius: RFValue(12.5),
        overflow: 'hidden',
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#5ad74f',
        borderRadius: RFValue(12.5),
    },
    progressInfo: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'right',
        width: '100%',
        height: '100%',
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressText: {
        color: '#FFF',
        fontSize: RFValue(12),
        fontFamily: 'RedHatDisplay_600SemiBold',
        marginLeft: RFValue(10),
    },
    icon: {
        marginLeft: RFValue(5),
        height: RFValue(15),
        width: RFValue(15),
        resizeMode: 'contain',
        
    },
});

export default ProgressBar;
