import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = ({ tab, userInfo }) => {
    const navigation = useNavigation();
    

    const icons = [
        { name: 'home', path: require('../assets/icons/menu/home.png'), screen: 'Home' },
        { name: 'practice', path: require('../assets/icons/menu/brain.png'), screen: 'Practice' },
        { name: 'learning', path: require('../assets/icons/menu/learning.png'), screen: 'Learning' },
        { name: 'settings', path: require('../assets/icons/menu/settings.png'), screen: 'Settings' },
    ];

    return (
        <View style={styles.container}>
            {icons.map(({ name, path, screen }) => (
                <TouchableOpacity
                    key={name}
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('MainRoutes', { screen, params: userInfo })}
                >
                    <Image
                        source={path}
                        style={[
                            styles.icon,
                            { tintColor: tab === name ? '#FFFFFF' : '#707070' },
                        ]}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        paddingVertical: 10,
        borderRadius: 20,
    },
    iconContainer: {
        padding: 2,
    },
    icon: {
        width: RFValue(20),
        height: RFValue(20),
        resizeMode: 'contain',
    },
});

export default NavigationBar;
