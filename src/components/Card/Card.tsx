import { View, Text, Image } from "react-native";

export const Card = (cardData={name:"Evroopt", number:"**** 3671"}) => {
    return (
        <View style={{backgroundColor: "red", padding: 5, borderRadius: 20, margin:5, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image style={{width: 320, height: 190, borderRadius: 20}} source={require("../../../assets/123.png")}></Image>
            <Text>Evroopt</Text>
            <Text>**** **** **** **** 1235</Text>
        </View>
    );
};
