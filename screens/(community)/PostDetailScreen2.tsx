/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    Pressable,
    useWindowDimensions,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Colors, { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import FillHeartIcon from "@/components/icons/FillHeartIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import ViewIcon from "@/components/icons/ViewsIcon";
import ImageView from "react-native-image-viewing";
import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import Loader from "@/components/(Utils)/loader";
import LikesBottomSheet from "@/components/bottomSheet/LikesBottomSheet";
import ViewsBottomSheet from "@/components/bottomSheet/ViewsBottomSheet";
import CommentCard from "@/components/card/CommentCard";
import { shareFile } from "@/components/Share";
import ShareIcon from "@/components/icons/ShareIcon";
import { placeholderUrl } from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import UpArrowIcon from "@/components/icons/UpArrowIcon";
import { useFocusEffect } from "@react-navigation/native";
import triggerHapticFeedback from "@/components/(Utils)/triggerHapticFeedback";
import { Language } from "@/constants/languages";
import Popover from "react-native-popover-view";
import ToastNotification from "@/components/(Utils)/toastNotification";
import useNotification from "@/components/(Utils)/displayNotification";
import MediaModal from "@/components/card/mediaModal";
import DOMAIN from "@/components/(Utils)/domain";
import VideoThumbnail from "@/components/card/Video_thumbnail";
import { Status8 } from "@/components/skeleton3";

const PostDetailScreen = ({ navigation, route }: any) => {
    const { post } = route.params;
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const commentsSheetRef = useRef<any>();
    const likesSheetRef = useRef<any>();
    const viewsSheetRef = useRef<any>();
    const [liked, setLiked] = useState(false);
    const [postData, setPostData] = useState(post);
    const [saved, setSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [commentCount, setCommentCount] = useState(post.commentCount);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [modal, setModal] = useState(false);
    const [swiperIndex, setIndex] = useState(0);
    const [imageModal, setImageModal] = useState(false);

    const data = useSelector((state: RootState) => state.getUserData.data);

    // console.log("IODDFF: ", data.email);
    console.log("GTA: ", postData);
    // console.log(postData?.user?.fullname);
    const layout = useWindowDimensions();

    const getComments = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            const request = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await fetch(
                `${DOMAIN}/api/posts/comment?postId=${post?._id}`,
                request,
            );

            // const res = await response.json()
            // console.log(res)
            // if (response.ok) {
            const responseData = await response.json();
            console.log("Comments data", responseData.data.comments);
            setComments(responseData.data.comments.reverse());
            // }
        } catch (error) {
            console.log("Couldn't get comments", error);
        }
    };

    const getPostDetails = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");
            const request = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await fetch(
                `${DOMAIN}/api/posts/details?postId=${post?._id}`,
                request,
            );

            if (response.status === 200) {
                const {
                    data: { post: details },
                } = await response.json();
                setPostData(details);

                setLiked(details.likes.includes(data._id));
                setLikeCount(details?.likeCount);
                setSaved(details?.saves.includes(data._id));
                setViewCount(details?.viewCount);
                setCommentCount(details.commentCount);
            }
            await getComments();
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    useFocusEffect(
        useCallback(() => {
            setPostData(post);
            getPostDetails();
        }, [post]),
    );

    const likePost = async () => {
        try {
            triggerHapticFeedback();
            const token = await AsyncStorage.getItem("token");
            if (liked) {
                setLikeCount(likeCount - 1);
            } else {
                setLikeCount(likeCount + 1);
            }
            setLiked(!liked);

            const request = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId: post?._id,
                }),
            };

            const response = await fetch(`${DOMAIN}/api/posts/like`, request);

            if (response.ok) {
                const responseData = await response.json();
                console.log("Liked successfully", responseData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openImageViewer = (index: any) => {
        setIndex(index);
        setImageModal(true);
    };
    const {
        backgroundColor,
        color,
        displayNotificationIn,
        notification,
        show2,
    } = useNotification();

    const savePost = async () => {
        triggerHapticFeedback();
        const token = await AsyncStorage.getItem("token");
        if (saved) {
            displayNotificationIn(
                "Removed Post from Favorites",

                <AntDesign
                    name="checkcircleo"
                    size={40}
                    color={Colors.toastText}
                />,
                1800,
                Colors.background,
                Colors.welcomeText,
            );
        } else {
            displayNotificationIn(
                "Added Post to Favorites",

                <AntDesign
                    name="checkcircleo"
                    size={40}
                    color={Colors.toastText}
                />,
                1800,
                Colors.background,
                Colors.welcomeText,
            );
        }
        setSaved(!saved);

        const request = {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await fetch(
            `${DOMAIN}/api/posts/saved?postId=${post?._id}`,
            request,
        );

        if (response.status === 200) {
            const responseData = await response.json();
            console.log(responseData);
        }
    };

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
                    postId: post?._id,
                    userId: data._id,
                    comment: comment,
                }),
            };

            const response = await fetch(
                `${DOMAIN}/api/posts/comment`,
                request,
            );

            // const res = await response.json();
            // console.log(res);

            setProcessing(false);
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setProcessing(false);
                setComment("");
                setCommentCount(commentCount + 1);
                getComments();
                Keyboard.dismiss();
            }
        } catch (error) {
            console.log("Couldn't postData comment", error);
            setProcessing(false);
        }
    };

    useEffect(() => {
        if (!processing) {
            getComments();
        }
    }, [processing]);

    const followUnfollow = async () => {
        triggerHapticFeedback();
        const token = await AsyncStorage.getItem("token");
        setIsFollowing(!isFollowing);
        try {
            const request = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(
                `${DOMAIN}/api/users/actions/follow?id=${post?.user._id}`,
                request,
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                const res = await response.json();
                console.log("The issue is", res);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const editPost = () => {
        setModal(false);
        // @ts-ignore
        navigation.navigate("EditPost", { post });
    };

    const deletePost = async () => {
        setModal(false);
        navigation.goBack();
        const token = await AsyncStorage.getItem("token");
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(
                `${DOMAIN}/api/posts?postId=${post._id}`,
                request,
            ).then((res) => res.json());

            console.log(response);
        } catch (err) {}
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}
        >
            <MediaModal
                index={swiperIndex}
                imageModal={imageModal}
                setImageModal={setImageModal}
                Colors={Colors}
                post={post}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={50}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 20,
                            alignItems: "center",
                            paddingHorizontal: 16,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="chevron-back"
                                size={25}
                                style={{
                                    color: Colors.welcomeText,
                                }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontFamily: "sf-bold",
                                fontSize: 18,
                            }}
                        >
                            {languageText.text250}
                        </Text>
                        <View style={{ width: 25 }} />
                    </View>
                    <ToastNotification
                        show={show2}
                        text={notification.text}
                        textColor={color}
                        marginTop={Platform.OS === "ios" ? 0 : 0}
                        backgroundColor={backgroundColor}
                        icon={notification.icon}
                    />

                    {/* Post content */}
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 16,
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <Image
                            source={{
                                uri: postData?.user?.image
                                    ? postData?.user?.image
                                    : placeholderUrl,
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 60,
                                borderWidth: 4,
                                borderColor: Colors.background,
                            }}
                        />
                        <View>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontFamily: "sf-bold",
                                    fontSize: 18,
                                }}
                            >
                                {postData?.user?.fullname}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    opacity: 0.7,
                                }}
                            >
                                @{postData?.user?.email}
                            </Text>
                        </View>
                        {post.user?._id === data._id ? (
                            // If the post belongs to user
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
                                        onPress={editPost}
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
                                        onPress={deletePost}
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
                                    {/* <TouchableOpacity style={{justifyContent: "center", padding: 10, }} onPress={followUnfollow}>
                                <Text style={{color: Colors.welcomeText}}>
                                Like
                                </Text>
                            </TouchableOpacity> */}
                                </View>
                            </Popover>
                        ) : (
                            <TouchableOpacity
                                style={{
                                    // width: 60,
                                    // height: 30,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 6,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: "auto",
                                    borderWidth: 0.9,

                                    borderColor: Colors.welcomeText,
                                }}
                                onPress={followUnfollow}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        color={Colors.welcomeText}
                                    />
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: "500",
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        {!isFollowing
                                            ? languageText.text288
                                            : languageText.text289}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontSize: 18,
                                lineHeight: 25,
                            }}
                        >
                            {postData?.body}
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        {postData?.image && (
                            <View>
                                <Image
                                    source={{ uri: postData?.image }}
                                    style={{ width: "100%", height: 200 }}
                                />
                            </View>
                        )}

                        {postData?.media.length > 0 && (
                            <Swiper
                                style={{
                                    height:
                                        post.media?.length === 0
                                            ? 0
                                            : post.media?.length === 1
                                              ? 300
                                              : 320,
                                    marginTop:
                                        post.media?.length === 0 ? 0 : 20,
                                    // gap: 10,
                                }}
                                activeDotColor={Colors.default1}
                                loop={false}
                                showsPagination
                                paginationStyle={{ bottom: 0 }}
                                dotColor={Colors.greyPost}
                                dotStyle={{ height: 5, width: 5 }}
                                activeDotStyle={{ height: 7, width: 7 }}
                                snapToEnd
                                index={0}
                            >
                                {post.media ? (
                                    post.media?.map((item: any, e: any) => {
                                        return (
                                            <View
                                                key={e}
                                                onMoveShouldSetResponderCapture={() =>
                                                    true
                                                }
                                            >
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        openImageViewer(e)
                                                    }
                                                >
                                                    {item.type === "image" ? (
                                                        <Image
                                                            source={{
                                                                uri: item.url,
                                                            }}
                                                            style={{
                                                                height: 300,
                                                                borderRadius: 5,
                                                                borderColor:
                                                                    Colors.welcomeText,
                                                            }}
                                                        />
                                                    ) : (
                                                        <VideoThumbnail
                                                            url={item.url}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                ) : (
                                    <Status8 />
                                )}
                            </Swiper>
                        )}
                    </View>
                    <View
                        style={{
                            marginTop: 12,
                            borderWidth: 0.1,
                            paddingHorizontal: 16,
                        }}
                    >
                        <Text
                            style={{ color: Colors.welcomeText, opacity: 0.6 }}
                        >
                            {convertDate(postData?.createdAt)} •{" "}
                            {postData?.viewCount}{" "}
                            {postData?.viewCount > 1 ? "Views" : "View"}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            justifyContent: "space-between",
                            width: "100%",
                            borderTopWidth: 0.3,
                            borderColor: Colors.postSelectionBorderColor,
                            marginTop: 10,
                            marginBottom: 20,
                            height: 40,
                        }}
                    >
                        {/* Like */}
                        <Pressable
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                paddingHorizontal: 4,
                                justifyContent: "center",
                                opacity: liked ? 1 : 0.5,
                            }}
                            onPress={likePost}
                        >
                            {liked ? (
                                <FillHeartIcon color="rgba(200, 47, 90, 1)" />
                            ) : (
                                <HeartIcon color={Colors.welcomeText} />
                            )}

                            <Text
                                style={{
                                    color: liked
                                        ? "rgba(200, 47, 90, 1)"
                                        : Colors.welcomeText,
                                    fontWeight: "600",
                                    fontSize: 12,
                                }}
                            >
                                {likeCount}
                            </Text>
                        </Pressable>

                        {/* Comment */}
                        <Pressable
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: 4,
                                opacity: 0.5,
                            }}
                            onPress={() => commentsSheetRef.current?.present()}
                        >
                            <CommentIcon color={Colors.welcomeText} />
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontWeight: "600",
                                    fontSize: 12,
                                }}
                            >
                                {post.commentCount}
                            </Text>
                        </Pressable>

                        {/* Views */}
                        <Pressable
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                paddingHorizontal: 4,
                                justifyContent: "center",
                                opacity: 0.5,
                            }}
                            onPress={() => viewsSheetRef.current.open()}
                        >
                            <ViewIcon color={Colors.welcomeText} />
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontWeight: "600",
                                    fontSize: 12,
                                }}
                            >
                                {viewCount}
                            </Text>
                        </Pressable>

                        {/* Save post */}
                        <Pressable
                            onPress={savePost}
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                paddingHorizontal: 4,
                                justifyContent: "center",
                                opacity: 0.5,
                            }}
                        >
                            {saved ? (
                                <FontAwesome
                                    name="bookmark"
                                    size={20}
                                    color={Colors.default1}
                                />
                            ) : (
                                <FontAwesome
                                    name="bookmark-o"
                                    size={20}
                                    color={Colors.welcomeText}
                                    opacity={0.5}
                                />
                            )}
                        </Pressable>

                        {/* Share */}
                        <Pressable
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0.5,
                            }}
                            onPress={() =>
                                shareFile(post.id, "Share post link")
                            }
                        >
                            <ShareIcon color={Colors.welcomeText} />
                        </Pressable>
                    </View>
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontFamily: "sf-bold",
                            fontSize: 16,
                            marginBottom: 14,
                            paddingHorizontal: 16,
                        }}
                    >
                        {languageText.text238}
                    </Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={loading}
                        //         onRefresh={() => getPostDetails()}
                        //         tintColor={Colors.default1}
                        //     />
                        // }

                        contentContainerStyle={{
                            flex: 1,
                            paddingHorizontal: 16,
                        }}
                    >
                        {/* Display comments */}
                        <View
                            style={{
                                backgroundColor: Colors.background,
                                gap: 5,
                                marginTop: 10,
                            }}
                        >
                            {postData?.commentCount > 0 ? (
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    refreshing={loading}
                                    onRefresh={() => getComments()}
                                    refreshControl={
                                        <RefreshControl
                                            onRefresh={() => getComments()}
                                            refreshing={loading}
                                            tintColor={Colors.default1}
                                        />
                                    }
                                    data={comments}
                                    keyExtractor={(item: any, index) =>
                                        item._id
                                    }
                                    renderItem={({ item }) => (
                                        <CommentCard
                                            comment={item}
                                            setComments={setComments}
                                        />
                                    )}
                                    scrollEnabled={false}
                                />
                            ) : (
                                <View>
                                    <Text
                                        style={{
                                            color: Colors.welcomeText,
                                            fontFamily: "sf-bold",
                                            alignSelf: "center",
                                            fontSize: 16,
                                            marginTop: 16,
                                        }}
                                    >
                                        {languageText.text261}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    <LikesBottomSheet
                        likesSheetRef={likesSheetRef}
                        likes={postData?.likes}
                    />
                    <ViewsBottomSheet
                        viewsSheetRef={viewsSheetRef}
                        views={postData?.views}
                    />
                </ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: Colors.background,
                        justifyContent: "space-between",
                        gap: 5,
                        alignItems: "center",
                        paddingVertical: 2,
                        width: "100%",
                        marginTop: "auto",
                        flexShrink: 0,
                        borderWidth: 1,
                        borderRadius: 22,
                        borderColor: "rgba(120, 120, 120, 0.1)",
                        marginBottom: 10,
                        paddingLeft: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 5,
                            flex: 1,
                            borderRadius: 16,
                        }}
                    >
                        <TextInput
                            placeholder={languageText.text259}
                            style={{
                                fontFamily: "sf",
                                width: "85%",
                                fontSize: 16,
                                padding: 5,
                                color: Colors.welcomeText,
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PostDetailScreen;

function convertDate(dateString: string | undefined) {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Format date as locale string
    const formattedDate = date.toLocaleDateString();

    // Format time as locale string
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${formattedTime} • ${formattedDate}`;
}
