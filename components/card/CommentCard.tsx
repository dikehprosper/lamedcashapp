/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors, { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { placeholderUrl } from "@/constants/urls";
import TimeDifferenceDisplay from "../TimeDifference";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Popover from "react-native-popover-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "@/constants/languages";
import DOMAIN from "../(Utils)/domain";

const CommentCard = ({ comment, setComments }: any) => {
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

    const data = useSelector((state: RootState) => state.getUserData.data);
    const [modal, setModal] = useState(false);
    const [body, setBody] = useState(comment.description);
    const [edit, setEdit] = useState(comment.description);
    const [editMode, setEditMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const deleteComment = async () => {
        setModal(false);
        setComments((comments: any) =>
            comments.filter((item: any) => item._id !== comment._id)
        );
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(
                `${DOMAIN}/api/posts/comment?commentId=${comment._id}&postId=${comment.post}`,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    method: "DELETE",
                }
            ).then((res) => res.json());

            console.log(response);
        } catch (err) {}
    };

    const editComment = async () => {
        setIsEditing(true);
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(
                `${DOMAIN}/api/posts/comment?commentId=${comment._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ description: edit }),
                }
            ).then((res) => res.json());
            setEditMode(false);
            setBody(edit);
            console.log(response);
        } catch (err) {}
        setIsEditing(false);
    };

    return (
        <View
            style={{
                flexDirection: "row",
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.background,
            }}
        >
            <Image
                source={{
                    uri: comment.user?.image
                        ? comment?.user.image
                        : placeholderUrl,
                }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 10,
                }}
            />
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: Colors.welcomeText,
                            fontStyle: comment.user ? "normal" : "italic",
                        }}
                    >
                        {comment.user
                            ? comment.user?.fullname
                            : "Deleted Account"}
                    </Text>
                    <TimeDifferenceDisplay dateString={comment.createdAt} />
                    {comment.user?._id === data?._id && (
                        <Popover
                            isVisible={modal}
                            onRequestClose={() => setModal(false)}
                            popoverStyle={{
                                width: 200,
                                borderRadius: 20,
                                padding: 5,
                                backgroundColor: Colors.background,
                            }}
                            from={
                                <TouchableOpacity
                                    style={{
                                        marginLeft: "auto",
                                        marginBottom: "auto",
                                    }}
                                    onPress={() => setModal(true)}
                                >
                                    <MaterialCommunityIcons
                                        name="dots-horizontal"
                                        size={25}
                                        color={Colors.greyPost}
                                    />
                                </TouchableOpacity>
                            }
                        >
                            <View
                                style={{
                                    backgroundColor: Colors.background,
                                    gap: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        padding: 10,
                                        borderBottomWidth: 0.2,
                                        borderColor: Colors.greyPost,
                                    }}
                                    onPress={() => {
                                        setModal(false);
                                        setEditMode(true);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.welcomeText,
                                            fontSize: 16,
                                        }}
                                    >
                                        {languageText.text244}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        padding: 10,
                                    }}
                                    onPress={deleteComment}
                                >
                                    <Text
                                        style={{
                                            color: Colors.welcomeText,
                                            fontSize: 16,
                                        }}
                                    >
                                        {languageText.text243}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Popover>
                    )}
                </View>
                {editMode ? (
                    <View style={{ padding: 10 }}>
                        <TextInput
                            value={edit}
                            onChangeText={(e) => setEdit(e)}
                            autoFocus
                            style={{
                                fontSize: 16,
                                color: Colors.welcomeText,
                                marginTop: 2,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: Colors.default1,
                                borderRadius: 10,
                                marginTop: 10,
                                alignSelf: "flex-start",
                            }}
                            onPress={editComment}
                        >
                            {isEditing ? (
                                <ActivityIndicator color={"black"} />
                            ) : (
                                <Text
                                    style={{
                                        fontFamily: "sf-bold",
                                        fontSize: 14,
                                    }}
                                >
                                    {languageText.text244}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.welcomeText,
                            marginTop: 2,
                    
                        }}
                    >
                        {body.trim()}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CommentCard;
