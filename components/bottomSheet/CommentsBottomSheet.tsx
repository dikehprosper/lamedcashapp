/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "expo-image";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Color } from "@/constants/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colorScheme } from "../(userscomponent)/(TransactionTemplateUsers)/data";
import UpArrowIcon from "../icons/UpArrowIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeDifferenceDisplay from "../TimeDifference";
import { SafeAreaView } from "react-native-safe-area-context";
import { placeholderUrl } from "@/constants/urls";
import CustomModal from "../CustomModal";
import CommentCard from "../card/CommentCard";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Language } from "@/constants/languages";
import DOMAIN from "../(Utils)/domain";

const CommentsBottomSheet = ({
    post,
    userID,
}: {
    post: any;
    userID: string;
}) => {
    const data = useSelector((state: RootState) => state.getUserData.data);

    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState("");
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const getComments = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");

            const request = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await fetch(
                `${DOMAIN}/api/posts/comment?postId=${post._id}`,
                request
            );

            // const res = await response.json()
            // console.log(res)
            if (response.ok) {
                setLoading(false);
                const responseData = await response.json();
                console.log("Comments data", responseData.data.comments);
                setPostComments(responseData.data.comments.reverse());
                setProcessing(false);
            }
        } catch (error) {
            setLoading(false);
            console.log("Couldn't get comments", error);
            setProcessing(false);
        }
    };
    useEffect(() => {
        if (processing === false) {
            getComments();
        }
    }, [processing, post]);

    const uploadComment = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            setProcessing(true);

            const request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId: post._id,
                    userId: userID,
                    comment: comment.trim(),
                }),
            };

            const response = await fetch(
                `${DOMAIN}/api/posts/comment`,
                request
            );

            setProcessing(false);
            const responseData = await response.json();
            console.log(responseData);
            await getComments();
            setProcessing(false);
            setComment("");
        } catch (error) {
            console.log("Couldn't post comment", error);
            setProcessing(false);
        }
    };

    return (
        <BottomSheetView
            style={{ backgroundColor: Colors.background, flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height: "90%",
                            backgroundColor: Colors.background,
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            paddingHorizontal: 0,
                            // paddingBottom: 20,
                        }}
                        // onTouchStart={onTouchInsideModal}
                    >
                        <View
                            style={{
                                borderBottomWidth: 0.2,
                                borderBottomColor: Colors.greyPost,
                            }}
                        >
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
                                {languageText.text238}
                            </Text>
                        </View>

                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    onRefresh={() => getComments()}
                                    refreshing={loading}
                                    tintColor={Colors.default1}
                                />
                            }
                            style={[styles.commentScrollView]}
                        >
                            {postComments.length === 0 ? (
                                <View
                                    style={{
                                        padding: 30,
                                        paddingTop: 60,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: "sf",
                                            letterSpacing: 0.3,
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        {loading ? "" : "No comments yet..."}
                                    </Text>
                                </View>
                            ) : (
                                postComments.map(
                                    (comment: any, index: number) => {
                                        return (
                                            <CommentCard
                                                key={comment._id}
                                                comment={comment}
                                                setComments={setPostComments}
                                            />
                                        );
                                    }
                                )
                            )}
                        </ScrollView>

                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: Colors.background,
                                justifyContent: "space-between",
                                gap: 5,
                                alignItems: "center",
                                padding: 15,
                                width: "100%",
                                marginTop: "auto",
                                flexShrink: 0,
                                // borderTopWidth: 1,
                                borderTopColor: "rgba(120, 120, 120, 0.1)",
                            }}
                        >
                            <Image
                                source={{
                                    uri: data.image
                                        ? data.image
                                        : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                                }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 60,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: 5,
                                    width: "90%",
                                    height: 63,
                                    borderRadius: 16,
                                }}
                            >
                                <BottomSheetTextInput
                                    placeholder={languageText.text259}
                                    style={{
                                        fontFamily: "sf",
                                        width: "85%",
                                        fontSize: 15,
                                        paddingVertical: 10,
                                        paddingHorizontal: 10,
                                        color: Colors.welcomeText,
                                        borderColor: "rgba(120, 120, 120, 0.3)",
                                        borderWidth: 1,
                                        borderRadius: 18,
                                    }}
                                    multiline
                                    value={comment}
                                    onChangeText={(e) => setComment(e)}
                                />
                                <Pressable
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 60,
                                        backgroundColor: Colors.default1,
                                        opacity: comment === "" ? 0.3 : 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={uploadComment}
                                    disabled={comment === ""}
                                >
                                    {processing ? (
                                        <ActivityIndicator color="#ffffff" />
                                    ) : (
                                        <UpArrowIcon />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </BottomSheetView>
    );
};

const SingleUserComment = ({ comment }: { comment: any }) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    return (
        <View style={styles.singleUserComment}>
            <View style={styles.singleUserComment.imageDiv}>
                <Image
                    source={
                        comment.user?.image
                            ? { uri: comment.user?.image }
                            : { uri: placeholderUrl }
                    }
                    style={styles.singleUserComment.imageDiv.image}
                />
            </View>
            <View style={styles.singleUserComment.contentDiv}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "95%",
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        style={[
                            styles.singleUserComment.name,
                            { flexDirection: "row", gap: 10 },
                        ]}
                    >
                        <Text
                            style={[
                                styles.singleUserComment.contentDiv.name.text,
                                {
                                    color: Colors.welcomeText,
                                    width: "40%",
                                    fontSize: 14,
                                },
                            ]}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            {comment.user?.fullname}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                width: "35%",
                                color: Colors.welcomeText,
                                opacity: 0.8,
                            }}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            @{comment.user?.email}
                        </Text>
                        <TimeDifferenceDisplay dateString={comment.createdAt} />
                        {/* dateString={comment.createdAt}/> */}
                    </Pressable>
                    {/* <Pressable>
                        <Menu>
                            <MenuTrigger text="..." />
                            <MenuOptions>
                                <MenuOption
                                    onSelect={() => alert(`Save`)}
                                    text="Save"
                                />
                                <MenuOption onSelect={() => alert(`Delete`)}>
                                    <Text style={{ color: "red" }}>Delete</Text>
                                </MenuOption>
                                <MenuOption
                                    onSelect={() => alert(`Not called`)}
                                    disabled={true}
                                    text="Disabled"
                                />
                            </MenuOptions>
                        </Menu>
                    </Pressable> */}
                </View>
                <Pressable style={styles.singleUserComment.contentDiv.comment}>
                    <Text
                        style={[
                            styles.singleUserComment.contentDiv.comment.text,
                            { color: Colors.welcomeText, fontSize: 16 },
                        ]}
                    >
                        {comment.description}
                    </Text>
                </Pressable>
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
            fontSize: 16,
            fontWeight: "700",
            letterSpacing: -0.1,
        },
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        alignItems: "center",
        padding: 20,
        paddingBottom: 35,
        width: "100%",
        paddingTop: 20,
        borderTopWidth: 1,
        position: "absolute",
        bottom: 0,
        borderTopColor: "rgba(120, 120, 120, 0.1)",
    },

    singleUserComment: {
        padding: 5,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        imageDiv: {
            borderWidth: 1.5,
            borderColor: "#17b978",
            width: 44,
            height: 45,
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
                    fontWeight: "600",
                    fontSize: 13,
                    letterSpacing: 0.2,
                },
            },
            comment: {
                paddingTop: 3,
                paddingBottom: 3,
                width: "95%",
                text: {
                    fontFamily: "sf",
                    fontSize: 12,
                    letterSpacing: 0.4,
                },
            },
        },
    },
} as any);

export default CommentsBottomSheet;
