import {View, Text, Image, StyleSheet} from "react-native";
import {Mixin} from "../../styles";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useState} from "react";

interface ICardProps {
    name?: string;
    code?: string;
}


export const Card = (props: ICardProps) => {
    const {name = "Evroopt", code = "**** 3671"} = props
    const {cardBox, cardItem, cardContainer} = styles
    const [active, setActive] = useState<boolean>(false);
    const handlePressStar = () => {
        setActive(prevState => !prevState)
    }
    return (
        <View style={cardBox}>
                <Image
                    style={cardItem}
                    source={require("../../../assets/123.png")}
                />
            <View style={[Mixin.theMostCenterOfCenters, cardContainer]}>
                <Octicons name="info" size={30} style={[styles.iconBox, styles.infoBox]}/>
                <Text style={styles.textCars}>Evroopt</Text>
                <AntDesign
                    name="star"
                    size={30}
                    color={active? 'gold' : 'white'}
                    style={[styles.iconBox, styles.favBox]}
                    onPress={handlePressStar}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create(
    {
        cardBox: {
            padding: 5,
            borderRadius: 20,
            margin: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        cardItem: {
            width: 345,
            height: 200,
            borderRadius: 20
        },
        cardContainer: {
            position: 'absolute',
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: '100%',
            height: '100%'
        },
        textCars: {
            color: 'white',
            fontWeight: "900",
            fontSize: 30
        },
        infoBox: {
            position: "absolute",
            top: 0,
            right: 0,
            margin: 10,
            color: '#ffffff'
        },
        favBox: {
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: 10,
        },
        iconBox: {
            // padding: 5,
            // backgroundColor: 'rgba(0,0,0,0.75)',
            // borderRadius: 50,
        }
    }
)
