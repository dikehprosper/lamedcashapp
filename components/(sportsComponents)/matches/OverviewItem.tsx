/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Text, useWindowDimensions, View } from "react-native";
import { Event } from "./Overview";

export default function OverviewItem({
    item,
    homeTeam,
    awayTeam,
    colors,
    halftimeItem,
    fulltimeScores,
    halftimeScores,
    isFulltime,
    fulltimeItem,
}: {
    item: Event;
    homeTeam: number;
    awayTeam: number;
    colors: any;
    halftimeItem: boolean;
    fulltimeScores: any;
    halftimeScores: any;
    isFulltime: boolean;
    fulltimeItem: boolean;
}) {
    const layout = useWindowDimensions();
    console.log(item);
    return (
        <View>
            {halftimeItem && (
                <View>
                    <View
                        style={{
                            backgroundColor: colors.footballBackground,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 20,
                            padding: 8,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.welcomeText,
                                fontFamily: "sf-bold",
                            }}
                        >
                            HT {halftimeScores.home} - {halftimeScores.away}
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.greyPost,
                                height: 20,
                                width: 1,
                            }}
                        />
                    </View>
                </View>
            )}
            {fulltimeItem && isFulltime && (
                <View>
                    <View
                        style={{
                            backgroundColor: colors.footballBackground,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 20,
                            padding: 8,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.welcomeText,
                                fontFamily: "sf-bold",
                            }}
                        >
                            FT {fulltimeScores.home} - {fulltimeScores.away}
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.greyPost,
                                height: 20,
                                width: 1,
                            }}
                        />
                    </View>
                </View>
            )}
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    width: layout.width,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 5,
                        // width: "100%",
                        alignItems: "flex-end",
                    }}
                >
                    {homeTeam === item.team.id && (
                        <View>
                            <Text
                                style={{
                                    color: colors.welcomeText,
                                    fontFamily: "sf-bold",
                                }}
                            >
                                {item.type === "subst" && "In:"}{" "}
                                {item.player?.name}
                            </Text>
                            <Text
                                style={{
                                    color: colors.welcomeText,
                                    fontFamily: "sf",
                                    opacity: 0.6,
                                }}
                            >
                                {item.type === "subst"
                                    ? `Out: ${item.assist?.name}`
                                    : item.detail}
                            </Text>
                        </View>
                    )}
                </View>
                <View
                    style={{
                        flex: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={{
                            uri:
                                item.type === "subst"
                                    ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/substitution.png?alt=media&token=2951725e-2dc6-4e43-a4c9-341d0b9533d4"
                                    : item.type === "Card" &&
                                      item.detail.includes("Red")
                                    ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/red-card.png?alt=media&token=f5a23dab-e6ad-4d24-8f48-e74983e1be75"
                                    : item.type === "Card" &&
                                      item.detail.includes("Yellow")
                                    ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/yellow-card.png?alt=media&token=ed39704b-70cc-4e57-8594-fa27d118378a"
                                    : item.type === "Goal"
                                    ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Goal.png?alt=media&token=3d88a3a8-82b4-4f50-8bc4-45802a525f7e"
                                    : "",
                        }}
                        style={{
                            width: 18,
                            height: 18,
                        }}
                    />
                    <Text
                        style={{
                            color: colors.welcomeText,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {item.time?.elapsed}'
                    </Text>
                </View>
                <View style={{ flex: 5 }}>
                    {awayTeam === item.team.id && (
                        <View>
                            <Text
                                style={{
                                    color: colors.welcomeText,
                                    fontFamily: "sf-bold",
                                }}
                            >
                                {item.type === "subst" && "In:"}{" "}
                                {item.player?.name}
                            </Text>
                            <Text
                                style={{
                                    color: colors.welcomeText,
                                    fontFamily: "sf",
                                    opacity: 0.6,
                                }}
                            >
                                {item.type === "subst"
                                    ? `Out: ${item.assist?.name}`
                                    : item.detail}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}
