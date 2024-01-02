import { View, Text } from "react-native";

export const Card = (elem: string) => {
    return (
        <View style={{backgroundColor: "red", padding: 10, borderRadius: 20, margin: 5}}>
            <Text>Name card</Text>
            <Text>**** 3671</Text>
        </View>
    );
}