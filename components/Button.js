import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';

const Button = ({ isButtonDisabled, text, onButtonClicked, isLoading, imageSource, color = '#FFF', disabledColor = 'rgba(33, 33, 33, 0.5)', width = '50%', height = RFValue(40) }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, { width, height }, isButtonDisabled && { backgroundColor: disabledColor }]}
      disabled={isButtonDisabled}
      onPress={onButtonClicked}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View style={buttonStyles.contentContainer}>
          {imageSource && <Image source={imageSource} style={buttonStyles.image} />}
          <Text style={[buttonStyles.buttonText, isButtonDisabled && { color: disabledColor }]}>
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
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontFamily: 'RedHatDisplay_800ExtraBold',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: RFValue(25),
    height: RFValue(25),
    marginRight: RFValue(10),
  },
});

export default Button;
