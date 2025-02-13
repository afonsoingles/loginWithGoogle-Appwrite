import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const QuestionButton = ({ isButtonDisabled, text, onButtonClicked, isLoading, width, height }) => {
    return (
        <TouchableOpacity
            style={[
                buttonStyles.button,
                isButtonDisabled && buttonStyles.disabledButton,
                { width: width || '50%', height: height || RFValue(40) }
            ]}
            disabled={isButtonDisabled}
            onPress={onButtonClicked}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <View style={buttonStyles.contentContainer}>
                    <Text style={[buttonStyles.buttonText, isButtonDisabled && buttonStyles.disabledButton]}>
                        {text}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const buttonStyles = StyleSheet.create({
    button: {
        backgroundColor: '#1c1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
    },
    disabledButton: {
        color: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: '#1c1a1a',
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(24),
        fontFamily: 'RedHatDisplay_600SemiBold',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default QuestionButton;
