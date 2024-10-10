/* eslint-disable */
import React from "react";
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    FlatList,
    SafeAreaView,
} from "react-native";
import { Color } from "@/constants/Colors";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FixtureData } from "@/components/LeagueComponent";
import Tile from "@/components/tile";
import {
    NavigationState,
    SceneRendererProps,
    TabBar,
    TabView,
} from "react-native-tab-view";
import Standings from "@/components/(sportsComponents)/matches/Standings";
// Calculate the percentage value

const LeaguePage = ({
    navigation,
    route: { params: fixture },
}: {
    navigation: any;
    route: any;
}) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "fixtures", title: "Fixtures" },
        { key: "standings", title: "Standings" },
    ]);

    const layout = useWindowDimensions();
    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "fixtures":
                return (
                    <View style={{ paddingVertical: 20 }}>
                        <FlatList
                            keyExtractor={(item, index) =>
                                item.fixture.id.toString()
                            }
                            data={fixture.fixture.fixtures}
                            renderItem={({ item }: any) => (
                                <Tile fixture={item} navigation={navigation} />
                            )}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 10 }} />
                            )}
                        />
                    </View>
                );
            case "standings":
                return <Standings fixture={fixture.fixture} />;
            default:
                return null;
        }
    };

    const renderTabBar = (
        props: SceneRendererProps & {
            navigationState: NavigationState<{ key: string; title: string }>;
        }
    ) => {
        return (
            <TabBar
                {...props}
                tabStyle={{ width: "auto" }}
                gap={10}
                style={{
                    backgroundColor: "none",
                    elevation: 0,
                }}
                indicatorStyle={{
                    backgroundColor: Colors.default1,
                }}
                labelStyle={{
                    textTransform: "none",
                    fontSize: 15,
                    fontFamily: "sf-bold",
                }}
                activeColor={Colors.default1}
                inactiveColor={Colors.tabbarLabelColor}
            />
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                position: "relative",
                paddingTop: 10,
            }}
        >
            <View
                style={[
                    {
                        padding: 7,
                        position: "relative",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    // style={{ position: "absolute", left: 10, top: 13 }}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={32}
                        color={Colors.welcomeText}
                        opacity={0.3}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "sf-bold",
                        fontSize: 16,
                        color: Colors.welcomeText,
                    }}
                >
                    League Details
                </Text>
                <View style={{ width: 32 }}></View>
            </View>
            <View
                style={{
                    padding: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <Image
                    source={{ uri: fixture.fixture.league.logo }}
                    style={{ height: 50, width: 50 }}
                />
                <Text
                    style={{
                        fontFamily: "sf-bold",
                        fontSize: 20,
                        color: Colors.welcomeText,
                    }}
                >
                    {fixture.fixture.league.name}
                </Text>
            </View>
            <TabView
                swipeEnabled={false}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>
    );
};

export default LeaguePage;
