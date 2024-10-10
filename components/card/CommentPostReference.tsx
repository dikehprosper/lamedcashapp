/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { formatDistanceToNow } from "date-fns";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import ShareIcon from "../icons/ShareIcon";
import ViewIcon from "../icons/ViewsIcon";
import { useEffect, useRef, useState } from "react";
import { shareFile } from "../Share";
import Swiper from "react-native-swiper";
import ImageView from "react-native-image-viewing";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Popover from "react-native-popover-view";
import Colors, { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { placeholderUrl } from "@/constants/urls";
import TimeDifferenceDisplay from "../TimeDifference";
import {
    MaterialCommunityIcons,
    FontAwesome,
    AntDesign,
} from "@expo/vector-icons";
import ViewsBottomSheet from "../bottomSheet/ViewsBottomSheet";
import LikesBottomSheet from "../bottomSheet/LikesBottomSheet";
import CommentsBottomSheet from "../bottomSheet/CommentsBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FillHeartIcon from "../icons/FillHeartIcon";
import { convertDate } from "@/utils/convertData";
import { Language } from "@/constants/languages";
import DOMAIN from "../(Utils)/domain";
import VideoThumbnail from "./Video_thumbnail";
import { Status8 } from "../skeleton3";

const CommentPostReference = ({
    comment,
    post,
    displayNotificationIn,
}: any) => {
    const navigation = useNavigation();
    const commentsSheetRef = useRef<any>();
    const likesSheetRef = useRef<any>();
    const viewsSheetRef = useRef<any>();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [myComments, setMyComments] = useState([]);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    const [isFollowing, setIsFollowing] = useState(false);
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

    const data = useSelector((state: RootState) => state.getUserData.data);

    const likePost = async () => {
        try {
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

            const response = await fetch(`${DOMAIN}/api/posts/like/`, request);

            if (response.ok) {
                const responseData = await response.json();
                console.log("Liked successfully", responseData);
                setIsFollowing(!isFollowing);
            } else {
                const res = await response.json();
                console.log("Couldn't like this post", res);
                setLiked(false);
                setLikeCount(likeCount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openImageViewer = (index: any) => {
        setCurrentImageIndex(index);
        setImageViewerVisible(true);
    };

    const viewPost = () => {
        //@ts-ignore
        navigation.navigate("Post", { post });
    };

    const savePost = async () => {
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

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        } else {
            const res = await response.json();
            console.log("The issue is", res);
        }
    };

    const followUnfollow = async () => {
        const token = await AsyncStorage.getItem("token");
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
        // @ts-ignore
        navigation.navigate("EditPost", { post });
    };

    const deletePost = () => {};

    useEffect(() => {
        setSaved(post?.saves.includes(data._id));
        setIsFollowing(post?.user?.followers?.includes(data._id));
        setSaved(post?.saves?.includes(data._id));
        setLiked(post.likes?.includes(data._id));
        setLikeCount(post?.likeCount);
        setViewCount(post?.viewCount);
    }, [post, data]);
    return (
        <TouchableOpacity
            onPress={viewPost}
            style={{
                paddingBottom: 10,
            }}
        >
            <View
                style={{
                    padding: 8,
                    paddingBottom: 0,
                    paddingVertical: 15,
                    flexDirection: "row",
                    gap: 10,
                    paddingHorizontal: 15,
                }}
            >
                {/* <View>
                    <Image
                        source={
                            post?.user?.image
                                ? post?.user.image
                                : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d"
                        }
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 60,
                            borderWidth: 4,
                            borderColor: Colors.background,
                        }}
                    />
                </View> */}
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            paddingTop: 3,
                            flex: 1,
                        }}
                    >
                        <View>
                            <Image
                                source={
                                    post?.user?.image
                                        ? post?.user.image
                                        : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d"
                                }
                                style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 50,

                                    borderColor: Colors.background,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontFamily: "sf-bold",
                                color: Colors.welcomeText,
                                fontSize: 16,
                                letterSpacing: 0.6,
                                maxWidth: 120,
                                marginLeft: 3,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {post?.user?.fullname}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "sf",
                                color: Colors.greyPost,
                                fontSize: 14,
                                letterSpacing: 0.6,
                                maxWidth: 100,
                            }}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            @{post?.user?.email}
                        </Text>
                        {post?.user?._id === data._id ? (
                            // If the post belongs to user
                            <Popover
                                popoverStyle={{
                                    width: 200,
                                    borderRadius: 20,
                                    padding: 5,
                                    backgroundColor: Colors.background,
                                }}
                                from={
                                    <MaterialCommunityIcons
                                        name="dots-horizontal"
                                        size={25}
                                        color={Colors.greyPost}
                                        style={{
                                            marginLeft: "auto",
                                            marginBottom: "auto",
                                        }}
                                    />
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
                    <View style={{ flex: 1, marginTop: 5 }}>
                        <Text
                            numberOfLines={3}
                            style={{
                                fontFamily: "sf",
                                color: Colors.welcomeText,
                                fontSize: 16,
                                letterSpacing: 0.7,
                                lineHeight: 20.5,
                                marginTop: 5,
                            }}
                        >
                            {post?.body}
                        </Text>
                        <Swiper
                            style={{
                                height:
                                    post.media?.length === 0
                                        ? 0
                                        : post.media?.length === 1
                                          ? 300
                                          : 320,
                                marginTop: post.media?.length === 0 ? 0 : 20,
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
                        <ImageView
                            images={post?.media?.map((item: any) => ({
                                ...item,
                                uri: item.url,
                            }))}
                            imageIndex={currentImageIndex}
                            visible={imageViewerVisible}
                            onRequestClose={() => setImageViewerVisible(false)}
                            swipeToCloseEnabled
                            // onImageIndexChange={setCurrentImageIndex}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: post.media?.length === 0 ? 25 : 10,
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
                        <Pressable onPress={savePost}>
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
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingTop: 14,
                            gap: 5,
                        }}
                    >
                        {post?.commenCount !== 0 ? (
                            <TouchableOpacity
                                onPress={viewPost}
                                style={{
                                    paddingBottom: 3,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.greyPost,

                                        fontSize: 13,
                                        fontWeight: "500",
                                    }}
                                >
                                    {/* Liked by {post?.likes[0].name.slice(0, 8)}
                                    ... and {post?.likeCount - 1} others */}
                                    {post?.commentCount === 0
                                        ? ""
                                        : ` View all ${post?.commentCount} ${
                                              post?.commentCount === 1
                                                  ? "comment"
                                                  : "comments"
                                          }`}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            ""
                        )}
                        <Text
                            style={{
                                fontFamily: "sf",
                                color: Colors.greyPost,
                                fontSize: 11,
                                // textAlign: "center",
                                marginLeft: "auto",
                                width: "100%",
                            }}
                        >
                            {/* {convertDate(post?.createdAt, "locale-string")} */}
                        </Text>
                    </View>
                </View>
            </View>
            <BottomSheetModal
                keyboardBehavior="extend"
                backgroundStyle={{ backgroundColor: Colors.background }}
                handleIndicatorStyle={{ backgroundColor: Colors.welcomeText }}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        opacity={0.8}
                        pressBehavior={"close"}
                        disappearsOnIndex={-1}
                    />
                )}
                // enableDynamicSizing
                enablePanDownToClose
                enableHandlePanningGesture
                snapPoints={["80%"]}
                ref={commentsSheetRef}
            >
                <CommentsBottomSheet post={post} userID={data._id} />
            </BottomSheetModal>
            <LikesBottomSheet
                likesSheetRef={likesSheetRef}
                likes={post?.likes}
            />
            <ViewsBottomSheet
                viewsSheetRef={viewsSheetRef}
                views={post?.views}
            />
            <Text
                style={{
                    paddingLeft: 35,
                    fontSize: 14,
                    fontWeight: "600",
                    color: Colors.welcomeText,
                    marginVertical: 10,
                    opacity: 0.5,
                }}
            >
                {languageText.text291}
                {comment?.lenght > 1 ? "s": ""}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    paddingTop: 0,
                    paddingVertical: 10,
                    paddingLeft: 35,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    backgroundColor: Colors.background,
                }}
            >
                <Image
                    source={{
                        uri: comment?.user?.image
                            ? comment?.user.image
                            : placeholderUrl,
                    }}
                    style={{
                        width: 30,
                        height: 30,
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
                            }}
                        >
                            {comment?.user.fullname}
                        </Text>
                        <TimeDifferenceDisplay
                            dateString={comment?.createdAt}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.welcomeText,
                            marginTop: 2,
                        }}
                    >
                        {comment?.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CommentPostReference;
