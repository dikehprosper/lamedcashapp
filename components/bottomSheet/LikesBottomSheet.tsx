/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { Image } from "expo-image";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DOMAIN from "../(Utils)/domain";


const LikesBottomSheet = ({
    likesSheetRef,
    likes,
}: {
    likesSheetRef: any;
    likes: any[];
}) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    return (
        <>
            <RBSheet
                ref={likesSheetRef}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: Colors.background,
                    },
                    container: {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: Colors.background,
                        paddingBottom: 40,
                    },
                }}
                customModalProps={{
                    animationType: "fade",
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
                height={hp("85%")}
                draggable
            >
                <View
                    style={{
                        marginTop: -17,
                        borderBottomWidth: 0.2,
                        borderBottomColor: Colors.greyPost,
                    }}
                >
                    <View
                        style={{
                            marginBottom: 5,
                            width: 50,
                            height: 5,
                            alignSelf: "center",
                            backgroundColor: Colors.welcomeText,
                        }}
                    />
                    <Text
                        style={[
                            styles.header.text,
                            {
                                color: Colors.welcomeText,
                                fontSize: 18,
                                marginVertical: 10,
                            },
                        ]}
                    >
                        Likes
                    </Text>
                </View>
                <ScrollView style={styles.commentScrollView}>
                    {likes.map((user, index: number) => {
                        return <SingleUserLike key={index} user={user} />;
                    })}
                </ScrollView>
            </RBSheet>
        </>
    );
};

const SingleUserLike = ({ user }: { user: any }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const followUnfollow = async () => {
        console.log("pressed");
        const token = await AsyncStorage.getItem("token");
        try {
            setLoading(true);
            const request = {
                method: "PUT",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(
                `${DOMAIN}/api/users/actions/follow?id=${user._id}`,
                request,
            );

            // const res =  await response.json();
            setLoading(false);

            // console.log(res);
            if (response.ok) {
                const responseData = await response.json();
                console.log("BE response", responseData);
                const message = responseData.message;

                if (message === "Unfollowed user") {
                    setIsFollowing(false);
                } else if (message === "Followed User") {
                    setIsFollowing(true);
                }
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const data = useSelector((state: RootState) => state.getUserData.data);

    useEffect(() => {
        console.log("You follow", data.following)
        const following = data.following.some(function (follow: any) {
            return follow._id === user._id;
        });

        console.log("Currently following", following);
        setIsFollowing(following);
    }, []);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );

    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    console.log("USER: ", user);

    return (
        <View style={styles.singleUserComment}>
            <View style={styles.singleUserComment.imageDiv}>
                <Image
                    source={
                        data._id === user._id
                            ? { uri: data.image }
                            : require("../../assets/images/man.jpg")
                    }
                    style={styles.singleUserComment.imageDiv.image}
                />
            </View>
            <View style={styles.singleUserComment.contentDiv}>
                <Pressable style={styles.singleUserComment.name}>
                    <Text
                        style={[
                            styles.singleUserComment.contentDiv.name.text,
                            { color: Colors.welcomeText },
                        ]}
                    >
                        {user.name}
                    </Text>
                </Pressable>
                <Pressable style={styles.singleUserComment.contentDiv.comment}>
                    <Text
                        style={{
                            fontFamily: "sf",
                            color: Colors.greyPost,
                            fontSize: 12,
                            letterSpacing: 0.4,
                        }}
                    >
                        {user.userEmail}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.singleUserComment.followDiv}>
                {data._id !== user._id ? (
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 30,
                            borderRadius: 10,
                            backgroundColor: !isFollowing
                                ? Colors.notFollowing
                                : Colors.following,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => followUnfollow()}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.welcomeText} />
                        ) : (
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: "sf-bold",
                                    color: Colors.followingText,
                                }}
                            >
                                {!isFollowing ? "Follow" : "Folowing"}
                            </Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentScrollView: {
        padding: 15,
    },
    header: {
        padding: 5,
        text: {
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            letterSpacing: -0.1,
        },
    },
    singleUserComment: {
        padding: 0,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        imageDiv: {
            width: 62,
            height: 62,
            borderRadius: 60,
            padding: 2.5,
            image: {
                width: "100%",
                height: "100%",
                borderRadius: 60,
            },
        },
        contentDiv: {
            paddingTop: 3,
            name: {
                text: {
                    fontFamily: "sf-bold",
                    fontSize: 15,
                    letterSpacing: 0.2,
                },
            },
            comment: {
                paddingTop: 3,
                paddingBottom: 3,
                text: {
                    fontFamily: "sf",
                    fontSize: 12,
                    letterSpacing: 0.4,
                },
            },
        },
        followDiv: {
            marginLeft: "auto",
            button: {
                height: 38,
                backgroundColor: "#17b978",
                paddingLeft: 28,
                paddingRight: 28,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                text: {
                    color: "#ffffff",
                    fontFamily: "sf",
                    fontSize: 14,
                    letterSpacing: 0.4,
                },
            },
        },
    },
} as any);

export default LikesBottomSheet;
