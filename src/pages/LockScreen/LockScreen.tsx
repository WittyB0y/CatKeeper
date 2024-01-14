import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LockScreen = () => {
    const [password, setPassword] = useState('');
    const correctPassword = '12345';

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleUnlock = () => {
        if (password === correctPassword) {
            Alert.alert('Успех', 'Приложение разблокировано!');
        } else {
            Alert.alert('Ошибка', 'Неверный пароль, попробуйте еще раз.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Введите пароль</Text>
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                onChangeText={handlePasswordChange}
                value={password}
            />
            <Button title="Разблокировать" onPress={handleUnlock} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default LockScreen;
