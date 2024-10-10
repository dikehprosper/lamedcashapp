/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from "@/constants/Colors";
import { Image } from "expo-image";

import { formatDistanceToNow } from "date-fns";
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import ShareIcon from "../icons/ShareIcon";
import ViewIcon from "../icons/ViewsIcon";
import { useEffect, useRef, useState } from "react";
import CommentsBottomSheet from "../bottomSheet/CommentsBottomSheet";
import LikesBottomSheet from "../bottomSheet/LikesBottomSheet";
import ViewsBottomSheet from "../bottomSheet/ViewsBottomSheet";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import FillHeartIcon from "../icons/FillHeartIcon";
import { useNavigation } from "@react-navigation/native";
import { shareFile } from "../Share";
import {
    AntDesign,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageView from "react-native-image-viewing";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import StickyModal from "../StickyModal";
import Popover from "react-native-popover-view";
import { InView } from "react-native-intersection-observer";
import triggerHapticFeedback from "../(Utils)/triggerHapticFeedback";
import * as Haptics from "expo-haptics";
import { Language } from "@/constants/languages";
import useNotification from "../(Utils)/displayNotification";
import App from "../(Utils)/skeletonLoader";

import {
    Status,
    Status2,
    Status3,
    Status4,
    Status5,
    Status6,
    Status7,
    Status8,
} from "../skeleton3";
import MediaModal from "./mediaModal";
import DOMAIN from "../(Utils)/domain";
import VideoThumbnail from "./Video_thumbnail";
const SinglePostPreview = ({
    post,
    setPosts,
    displayNotificationIn,
}: {
    post: any;
    setPosts?: any;
    displayNotificationIn?: any;
}) => {
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
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    const [isFollowing, setIsFollowing] = useState(false);
    const [modal, setModal] = useState(false);
    const [otherPostOptions, setOtherPostOptions] = useState(false);
    const [top, setTop] = useState(0);
    const [swiperIndex, setIndex] = useState(0);
    const [imageModal, setImageModal] = useState(false);
    const childRef = useRef(null);
  

    const navigation = useNavigation();

    const data = useSelector((state: RootState) => state.getUserData.data);

    console.log("GTA: ", post);

    const layout = useWindowDimensions();

    useEffect(() => {
        setSaved(post?.saves.includes(data._id));
        setIsFollowing(post?.user?.followers?.includes(data._id));
        setSaved(post?.saves?.includes(data._id));
        setLiked(post.likes?.includes(data._id));
        setLikeCount(post?.likeCount);
        setViewCount(post?.viewCount);
    }, [post, data]);

    const likePost = async () => {
            setPopupVisible(true);
        console.log(DOMAIN, "DOMAIN");
        try {
            triggerHapticFeedback();
            console.log("done");
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
                    postId: post._id,
                }),
            };

            const response = await fetch(`${DOMAIN}/api/posts/like`, request);

            if (response.ok) {
                const responseData = await response.json();
                console.log("Liked successfully", responseData);
            } else {
                const res = await response.json();
                console.log("Couldn't like this post", res);
                setLiked(!liked);
                setLikeCount(likeCount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openImageViewer = (index: any) => {
        setIndex(index);
        setImageModal(true);
    };

    const viewPost = () => {
        //@ts-ignore
        navigation.navigate("Post2", { post });
    };

    const savePost = async () => {
        const token = await AsyncStorage.getItem("token");
        if (saved) {
            displayNotificationIn(
                languageText.text253,

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
                languageText.text252,

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
            `${DOMAIN}/api/posts/saved?postId=${post._id}`,
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
        triggerHapticFeedback();
        const token = await AsyncStorage.getItem("token");
        setIsFollowing(!isFollowing);
        if (setPosts) {
            setPosts((posts: any) =>
                posts?.map((item: any) => {
                    if (item.user._id === post.user._id) {
                        if (!isFollowing) {
                            return {
                                ...item,
                                user: {
                                    ...item.user,
                                    followers: [
                                        ...item.user.followers,
                                        data._id,
                                    ],
                                },
                            };
                        } else {
                            return {
                                ...item,
                                user: {
                                    ...item.user,
                                    followers: item.user.followers.filter(
                                        (item: any) => item !== data._id,
                                    ),
                                },
                            };
                        }
                    }
                    return item;
                }),
            );
        }
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
        setPosts((posts: any) =>
            posts.filter((item: any) => post._id !== item._id),
        );
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

    const addToView = async () => {
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`${DOMAIN}/api/posts/view`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ postId: post._id }),
            }).then((res) => res.json());

            console.log(response);
        } catch (err) {}
    };

    const handleViewChange = (inView: boolean) => {
        if (inView) {
            if (!post.views.includes(data._id)) {
                addToView();
            }
        }
    };

     const [isPopupVisible, setPopupVisible] = useState(false);

    const closePopup = () => {
        setPopupVisible(false);
    };


    return (
        <InView onChange={handleViewChange}>
            <MediaModal
                index={swiperIndex}
                imageModal={imageModal}
                setImageModal={setImageModal}
                Colors={Colors}
                post={post}
            />
            <TouchableOpacity onPress={viewPost}>
                <View
                    style={{
                        padding: 8,
                        paddingVertical: 15,
                        flexDirection: "row",
                        gap: 10,
                        borderBottomColor: "rgba(120, 120, 120, 0.3)",
                        borderBottomWidth: 0.5,
                    }}
                >
                    <View>
                        <Image
                            source={
                                post.user?.image
                                    ? post.user.image
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
                    </View>
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
                            <Text
                                style={{
                                    fontFamily: "sf-bold",
                                    color: Colors.welcomeText,
                                    fontSize: 16,
                                    letterSpacing: 0.6,
                                    maxWidth: 120,
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
                                @{post.user?.email}
                            </Text>
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
                        <View style={{ flex: 1, marginTop: 5 }}>
                            <Text
                                numberOfLines={3}
                                style={{
                                    fontFamily: "sf",
                                    color: Colors.welcomeText,
                                    fontSize: 16,
                                    letterSpacing: 0.7,
                                    lineHeight: 20.5,
                                }}
                            >
                                {post.body}
                            </Text>
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
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: 10,
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
                                onPress={() =>
                                    commentsSheetRef.current?.present()
                                }
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
                            {post.commenCount !== 0 ? (
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
                                        {/* Liked by {post.likes[0].name.slice(0, 8)}
                                    ... and {post.likeCount - 1} others */}
                                        {post.commentCount === 0
                                            ? languageText.text254
                                            : `${languageText.text256} ${
                                                  post.commentCount
                                              } ${
                                                  post.commentCount === 1
                                                      ? languageText.text255
                                                      : languageText.text238
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
                                {convertDate(post.createdAt, "locale-string")}
                            </Text>
                        </View>
                    </View>
                </View>
                <BottomSheetModal
                    keyboardBehavior={
                        Platform.OS === "ios" ? "extend" : "interactive"
                    }
                    backgroundStyle={{ backgroundColor: Colors.background }}
                    handleIndicatorStyle={{
                        backgroundColor: Colors.welcomeText,
                    }}
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
                    likes={post.likes}
                />
                <ViewsBottomSheet
                    viewsSheetRef={viewsSheetRef}
                    views={post.views}
                />
            </TouchableOpacity>
        </InView>
    );
};

export default SinglePostPreview;

function convertDate(date: string | Date, formatType: string): string {
    if (formatType === "locale-string") {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }
    // Handle other formats if needed
    return new Date(date).toLocaleString();
}
