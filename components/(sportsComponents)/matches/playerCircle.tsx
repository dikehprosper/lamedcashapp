/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Player } from "@/components/(sportsComponents)/matches/Lineups";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export default function PlayerCircle({
    style,
    player,
    backgroundColor,
    borderColor,
}: {
    style?: StyleProp<ViewStyle>;
    player: Player;
    backgroundColor: string;
    borderColor: string;
}) {
    const splitNames = () => {
        const splitArray = player.name.split(" ");
        let playerName = "";

        for (let i = 0; i < splitArray?.length; i++) {
            if (i != splitArray?.length - 1) {
                if (i == 0) {
                    playerName += `${splitArray[i][0]}.`;
                } else {
                    playerName += ` ${splitArray[i][0]}.`;
                }
            } else {
                playerName += splitArray[i];
            }
        }
        return playerName;
    };
    const playerName = splitNames();

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
                style={{ ...styles.playerCircle, backgroundColor, borderColor }}
            >
                <Text style={{ color: "white", fontFamily: "sf-bold" }}>
                    {player.number}
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 5,
                    position: "absolute",
                    bottom: -25,
                    width: 80,
                }}
            >
                <Text numberOfLines={1} style={styles.playerName}>
                    {playerName}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playerCircle: {
        borderRadius: 99,
        alignItems: "center",
        justifyContent: "center",
        height: 25,
        width: 25,
        borderWidth: 0.5,
    },
    playerName: {
        textAlign: "center",
        fontSize: 13,
        color: "white",
        fontFamily: "sf",
    },
});
