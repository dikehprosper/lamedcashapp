/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { Language } from "@/constants/languages";
import { placeholderUrl } from "@/constants/urls";
import { RootState } from "@/state/store";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const ViewsBottomSheet = ({
    viewsSheetRef,
    views,
}: {
    viewsSheetRef: any;
    views: any[];
}) => {
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

    return (
        <>
            <RBSheet
                ref={viewsSheetRef}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: Colors.welcomeText,
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
                dragOnContent
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
                        Viewed by
                    </Text>
                </View>
                {views.length !== 0 ? (
                    <FlatList
                        contentContainerStyle={styles.commentScrollView}
                        data={views}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    width: "100%",
                                    backgroundColor:
                                        Colors.postSelectionBorderColor,
                                    // marginVertical: 10,
                                    height: 1,
                                }}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }: any) => (
                            <SingleUserView view={item} />
                        )}
                    />
                ) : (
                    <View style={{ padding: 50 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text263}
                        </Text>
                    </View>
                )}
            </RBSheet>
        </>
    );
};

const SingleUserView = ({ view }: { view: any }) => {
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
    return (
        <View style={styles.singleUserComment}>
            <View style={styles.singleUserComment.imageDiv}>
                <Image
                    source={view?.image ? view.image : placeholderUrl}
                    style={styles.singleUserComment.imageDiv.image}
                />
            </View>
            <View style={styles.singleUserComment.contentDiv}>
                <Pressable style={styles.singleUserComment.name}>
                    <Text
                        style={[
                            styles.singleUserComment.contentDiv.name.text,
                            {
                                fontFamily: "sf-bold",
                                fontSize: 16,
                                color: Colors.welcomeText,
                            },
                        ]}
                    >
                        {view.fullname}
                    </Text>
                </Pressable>
                <Pressable style={styles.singleUserComment.contentDiv.comment}>
                    <Text
                        style={[
                            styles.singleUserComment.contentDiv.comment.text,
                            {
                                fontFamily: "sf-bold",
                                fontSize: 16,
                                color: Colors.welcomeText,
                            },
                        ]}
                    >
                        @{view.tag}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.singleUserComment.followDiv}>
                {/* <Pressable style={styles.singleUserComment.followDiv.button}>
                    <Text
                        style={styles.singleUserComment.followDiv.button.text}
                    >
                        Follow
                    </Text>
                </Pressable> */}
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
            width: 50,
            height: 50,
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
                    color: "#ffffff",
                    fontFamily: "sf",
                    fontSize: 12.5,
                    letterSpacing: 0.2,
                },
            },
            comment: {
                paddingTop: 3,
                paddingBottom: 3,
                text: {
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "sf",
                    fontSize: 13.5,
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

export default ViewsBottomSheet;
