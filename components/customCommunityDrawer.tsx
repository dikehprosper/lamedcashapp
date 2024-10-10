/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Language } from "@/constants/languages";

const CustomCommunityDrawer = () => {
    const navigation = useNavigation();
    const data = useSelector((state: RootState) => state.getUserData.data);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
          const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: Colors.background,
            }}
        >
            <View>
                <Image
                    source={{
                        uri: data?.image
                            ? data.image
                            : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                    }}
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 60,
                        borderWidth: 4,
                    }}
                />
            </View>
            <View style={{ paddingVertical: 20 }}>
                <Text
                    style={{
                        color: Colors.welcomeText,
                        fontSize: 22,
                        fontFamily: "sf-bold",
                    }}
                >
                    {data.fullname}
                </Text>
                <Text
                    style={{
                        color: Colors.greyPost,
                        fontSize: 16,
                        fontFamily: "sf",
                    }}
                >
                    {data.email}
                </Text>
                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                    <Text
                        style={{
                            color: Colors.greyPost,
                            fontSize: 14,
                            fontFamily: "sf",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 14,
                                fontFamily: "sf-bold",
                            }}
                        >
                            {data.following?.length}
                        </Text>{" "}
                        Following
                    </Text>
                    <Text
                        style={{
                            color: Colors.greyPost,
                            fontSize: 14,
                            fontFamily: "sf",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 14,
                                fontFamily: "sf-bold",
                            }}
                        >
                            {data.followers?.length}
                        </Text>{" "}
                        Followers
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => navigation.navigate("CommunityProfile")}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 20,
                            paddingVertical: 14,
                        }}
                    >
                        <FontAwesome
                            name="user"
                            size={24}
                            color={Colors.welcomeText}
                            style={{ width: 30 }}
                        />
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 20,
                                fontFamily: "sf-bold",
                            }}
                        >
                            {languageText.text116}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider
                    style={{ backgroundColor: Colors.greyPost, opacity: 0.4 }}
                />
                <TouchableOpacity
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    onPress={() => navigation.navigate("Notifications")}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 20,
                            paddingVertical: 14,
                        }}
                    >
                        <FontAwesome
                            name="envelope"
                            size={24}
                            color={Colors.welcomeText}
                            style={{ width: 30 }}
                        />
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 20,
                                fontFamily: "sf-bold",
                            }}
                        >
                            Notifications
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider
                    style={{ backgroundColor: Colors.greyPost, opacity: 0.4 }}
                />
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => navigation.navigate("Explore")}
                >
                    <View
                        style={{
                            flexDirection: "row",

                            gap: 20,
                            paddingVertical: 14,
                        }}
                    >
                        <FontAwesome
                            name="users"
                            size={24}
                            color={Colors.welcomeText}
                            style={{ width: 30 }}
                        />
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 20,
                                fontFamily: "sf-bold",
                            }}
                        >
                            
                            {languageText.text165}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomCommunityDrawer;
