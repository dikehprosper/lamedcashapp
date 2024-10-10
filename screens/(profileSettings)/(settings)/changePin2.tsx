/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Pressable,
    ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import { Color } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { checkPin, checkPin2, requestPin } from "@/state/userData/getUserData";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Language } from "@/constants/languages";

interface formdata7 {
    email: string;
}
interface formdata8 {
    pin: string;
    email: string;
}

const ChangePin2 = ({ route, navigation }: any) => {
    const { email } = route.params;
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
    const [Loading2, setLoading2] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.getUserData.data);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [index, setIndex] = useState(0);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconVisibility1, setIconVisibility1] = useState(false);
    const [iconVisibility2, setIconVisibility2] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const inputRef2 = useRef<TextInput>(null);
    const inputRef3 = useRef<TextInput>(null);

    const handleDismissKeyboard = () => {
        inputRef.current?.blur();
        inputRef2.current?.blur();
        inputRef3.current?.blur();
    };

    function setItemOnBlur() {
        setIndex(0);
        // if (betId === "") {
        //   setBetIdError(false);
        // }
    }

    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setIndex(index);
    }

    // Password visibility settingr
    function changePasswordVisibility() {
        setIconVisibility((prev) => {
            return !prev;
        });
    }
    function changePasswordVisibility1() {
        setIconVisibility1((prev) => {
            return !prev;
        });
    }

    function changePasswordVisibility2() {
        setIconVisibility2((prev) => {
            return !prev;
        });
    }

    function handleSubmit() {
        setLoading2(true);

        const formData: formdata8 = {
            pin: password,
            email: email,
        };
        dispatch(checkPin2(formData))
            .then(async (result) => {
                console.log(
                    result.payload.success,
                    "result.payload.successresult.payload.success",
                );
                if (result.payload.success === true) {
                    try {
                        navigation.push("changePassword2");
                        setLoading2(false);
                    } catch (err) {
                        console.log(err);
                        setLoading2(false);
                    }
                }
                if (result.payload.status === 401) {
                    displayNotification4();
                    setLoading2(false);
                }
                if (result.payload.status === 402) {
                    displayNotification5();
                    setLoading2(false);
                }
            })
            .catch((err) => console.log(err));
    }

    const [display2, setDisplay2] = useState(languageText.text338);

    //FOR TOAstNotification
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const text1 = languageText.text1;
    const text2 = languageText.text2;
    const text4 = languageText.text142;
    const text5 = languageText.text143;

    const icon1 = (
        <AntDesign name="checkcircleo" size={40} color={Colors.welcomeText} />
    );
    const icon2 = (
        <AntDesign
            name="exclamationcircleo"
            size={40}
            color={Colors.welcomeText}
        />
    );

    function displayNotification() {
        setShow(1);
        setDisplay(1);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }
    function displayNotification2() {
        setShow(2);
        setDisplay(2);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }

    function displayNotification4() {
        setShow(4);
        setDisplay(4);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    function displayNotification5() {
        setShow(5);
        setDisplay(5);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <Pressable style={{ flex: 1 }} onPress={handleDismissKeyboard}>
            <ExploreHeader5 />
            <ToastNotification
                show={show === 0 ? true : false}
                text={
                    display === 1
                        ? text1
                        : display === 2
                          ? text2
                          : display === 4
                            ? text4
                            : text5
                }
                textColor={Colors.welcomeText}
                backgroundColor={display === 7 ? "green" : "red"}
                icon={display === 7 ? icon1 : icon2}
            />
            <View
                style={[
                    styles.container,
                    { backgroundColor: Colors.background },
                ]}
            >
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="chevron-back-outline"
                                size={26}
                                color={Colors.welcomeText}
                            />
                        </TouchableOpacity>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text144}
                        </Text>
                        <Text></Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 60,
                            marginBottom: 50,
                            gap: 30,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                opacity: 1,
                                color: Colors.welcomeText,
                            }}
                        >
                            {display2}
                        </Text>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 18,
                            backgroundColor: Colors.inputBackground2,
                            borderRadius: 8,
                            borderColor:
                                index === 1 ? Colors.default1 : "transparent",
                            borderWidth: 1.5,
                            position: "relative",
                        }}
                    >
                        <Text
                            style={{
                                paddingLeft: 12,
                                paddingRight: 2,
                                opacity: 1,
                            }}
                        >
                            <MaterialIcons
                                name="password"
                                size={18}
                                color={
                                    index === 1
                                        ? Colors.default1
                                        : "rgba(128, 128, 128, 1)"
                                }
                            />
                        </Text>
                        <TextInput
                            ref={inputRef}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setItemOnFocus(1)}
                            onBlur={setItemOnBlur}
                            secureTextEntry={iconVisibility}
                            autoCorrect={false}
                            placeholderTextColor={Colors.placeHolderTextColor}
                            autoCapitalize="none"
                            placeholder="code"
                            style={[defaultStyles.inputField]}
                            selectionColor={Colors.default1}
                        ></TextInput>

                        <TouchableOpacity
                            style={{
                                paddingRight: 15,
                                paddingLeft: 6,
                                opacity: 1,
                            }}
                            onPress={changePasswordVisibility}
                        >
                            {iconVisibility ? (
                                <Ionicons
                                    name="eye-off"
                                    size={18}
                                    color={
                                        index === 1
                                            ? Colors.default1
                                            : "rgba(128, 128, 128, 1)"
                                    }
                                />
                            ) : (
                                <Ionicons
                                    name="eye"
                                    size={18}
                                    color={
                                        index === 1
                                            ? Colors.default1
                                            : "rgba(128, 128, 128, 1)"
                                    }
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.default1,
                        height: 50,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        marginTop: 30,
                        marginBottom: 100,
                        opacity: Loading2 ? 0.5 : 1,
                    }}
                    onPress={handleSubmit}
                >
                    {Loading2 && (
                        <ActivityIndicator size="small" color="white" />
                    )}
                    <Text style={defaultStyles.btnText}>
                        {languageText.text16}
                    </Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,

        flexDirection: "column",
        gap: 30,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    cameraIconContainer: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        borderRadius: 20,
        padding: 5,
    },
    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: "white", // Adjust tint based on icon color
    },
});

export default ChangePin2;
