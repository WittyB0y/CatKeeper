import {View, Text, TouchableOpacity, Image, TextInput, TextInputBase, Button} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const themeColors = {
    bg: '#877dfa',
}

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View>
            <TextInput >Login</TextInput>
            <TextInput>Password</TextInput>
            <Button title={'Войти'}></Button>
        </View>
    )
}