import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'


export default function SplashLayout({setIsAppReady} : {setIsAppReady: (value: boolean) => void}) {
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <StatusBar hidden={true} /> 
      <LottieView 
        onAnimationFinish={() => setIsAppReady(true)}
        source={require('@/assets/lotties/splashLogo.json')}
        autoPlay
        resizeMode='cover'
        loop={false}
        style={{
            width: "100%",
            flex: 1
        }}
      />
    </View>
  )
}