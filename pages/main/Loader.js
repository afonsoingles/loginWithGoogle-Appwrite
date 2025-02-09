import React, { useEffect, useState } from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';



const Loader = () => {
    return (
        <BackgroundWrapper>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </BackgroundWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loader;