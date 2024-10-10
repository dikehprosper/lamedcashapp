/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function LeagueTilesLoader() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    return (
        <View style={{ gap: 20 }}>
            <View style={{ padding: 10, gap: 10 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Skeleton
                        colors={[Colors.greyPost, Colors.background]}
                        colorMode={
                            parseFloat(colorScheme) === 2 ? "dark" : "light"
                        }
                        radius="round"
                        height={35}
                        width={35}
                    />
                </View>
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
            </View>
            <View style={{ padding: 10, gap: 10 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Skeleton
                        colors={[Colors.greyPost, Colors.background]}
                        colorMode={
                            parseFloat(colorScheme) === 2 ? "dark" : "light"
                        }
                        radius="round"
                        height={35}
                        width={35}
                    />
                </View>
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
            </View>
            <View style={{ padding: 10, gap: 10 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Skeleton
                        colors={[Colors.greyPost, Colors.background]}
                        colorMode={
                            parseFloat(colorScheme) === 2 ? "dark" : "light"
                        }
                        radius="round"
                        height={35}
                        width={35}
                    />
                </View>
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
                <Skeleton
                    colors={[Colors.greyPost, Colors.background]}
                    colorMode={parseFloat(colorScheme) === 2 ? "dark" : "light"}
                    width="100%"
                    height={50}
                />
            </View>
        </View>
    );
}
