import { Alert } from "react-native"

export const useNotifications = () => {
    const notifyUser = (message: string) => {
        Alert.alert(message)
    }

    return [notifyUser]
}