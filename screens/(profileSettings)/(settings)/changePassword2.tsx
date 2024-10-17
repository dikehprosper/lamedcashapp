/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
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
import ToastNotification from "@/components/(Utils)/toastNotification";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import {  resetPasswordForLoggedInUser2 } from "@/state/userData/getUserData";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";

interface formData {
    email: string;
    newPassword: string;
}

const ChangePassword2 = ({ navigation }: any) => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [index, setIndex] = useState(0);
  
    const [iconVisibility1, setIconVisibility1] = useState(false);
    const [iconVisibility2, setIconVisibility2] = useState(false);
    const data = useSelector((state: RootState) => state.getUserData.data);
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

    const [Loading2, setLoading2] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    function handleSubmit() {
         if (Loading2) return;
        setLoading2(true);

        if (newPassword !== confirmNewPassword) {
            setLoading2(false);
            displayNotification4();
            return;
        }
        if (
            newPassword === "" ||
            newPassword !== confirmNewPassword
        ) {
            setLoading2(false);
            return;
        }

        const formData: formData = {
            email: data.email,
            newPassword: newPassword,
        };

        dispatch(resetPasswordForLoggedInUser2(formData))
            .then(async (result) => {
                if (result.payload.success === true) {
                    try {
                        triggerHapticFeedback();
                        displayNotification5();
                        setNewPassword("");
               
                        setConfirmNewPassword("");
                        setLoading2(false);
                         navigation.dispatch(
                             CommonActions.reset({
                                 index: 0,
                                 routes: [{ name: "login" }],
                             }),
                         );
                    } catch (err) {
                        console.log(err);
                        setLoading2(false);
                    }
                }
                if (result.payload.status === 501) {
                    displayNotification();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setLoading2(false);
                }
                if (result.payload.status === 502) {
                    displayNotification2();
                    setLoading2(false);
                }

                if (result.payload.status === 503) {
                    displayNotification3();
                    setLoading2(false);
                }
            })
            .catch((err) => console.log(err));
    }

    //FOR TOAstNotification
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const text1 = languageText.text1;
    const text2 = languageText.text2;
    const text3 = languageText.text9;
    const text4 = languageText.text138;
    const text5 = languageText.text139;

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
    function displayNotification3() {
        setShow(3);
        setDisplay(3);
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
      <Pressable style={{flex: 1}} onPress={handleDismissKeyboard}>
        <ExploreHeader5 />
        <ToastNotification
          show={show === 0 ? true : false}
          text={
            display === 1
              ? text1
              : display === 2
                ? text2
                : display === 3
                  ? text3
                  : display === 4
                    ? text4
                    : text5
          }
          textColor={Colors.welcomeText}
          backgroundColor={display === 5 ? "green" : "red"}
          marginTop={0}
          icon={display === 5 ? icon1 : icon2}
        />
        <View style={[styles.container, {backgroundColor: Colors.background}]}>
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
                  name='chevron-back-outline'
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
                {languageText.text140}
              </Text>
              <Text></Text>
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
                borderColor: index === 2 ? Colors.default1 : "transparent",
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
                  name='password'
                  size={18}
                  color={
                    index === 2 ? Colors.default1 : "rgba(128, 128, 128, 1)"
                  }
                />
              </Text>
              <TextInput
                ref={inputRef2}
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setItemOnFocus(2)}
                onBlur={setItemOnBlur}
                secureTextEntry={iconVisibility1}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={languageText.text141}
                style={[defaultStyles.inputField]}
              ></TextInput>
              <TouchableOpacity
                style={{
                  paddingLeft: 6,
                  paddingRight: 15,
                  opacity: 1,
                }}
                onPress={changePasswordVisibility1}
              >
                {iconVisibility1 ? (
                  <Ionicons
                    name='eye-off'
                    size={18}
                    color={
                      index === 2 ? Colors.default1 : "rgba(128, 128, 128, 1)"
                    }
                  />
                ) : (
                  <Ionicons
                    name='eye'
                    size={18}
                    color={
                      index === 2 ? Colors.default1 : "rgba(128, 128, 128, 1)"
                    }
                  />
                )}
              </TouchableOpacity>
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
                borderColor: index === 3 ? Colors.default1 : "transparent",
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
                  name='password'
                  size={18}
                  color={
                    index === 3 ? Colors.default1 : "rgba(128, 128, 128, 1)"
                  }
                />
              </Text>
              <TextInput
                ref={inputRef3}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                onFocus={() => setItemOnFocus(3)}
                onBlur={setItemOnBlur}
                secureTextEntry={iconVisibility2}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={languageText.text39}
                style={[defaultStyles.inputField]}
              ></TextInput>
              <TouchableOpacity
                style={{
                  paddingLeft: 6,
                  paddingRight: 15,
                  opacity: 1,
                }}
                onPress={changePasswordVisibility2}
              >
                {iconVisibility1 ? (
                  <Ionicons
                    name='eye-off'
                    size={18}
                    color={
                      index === 3 ? Colors.default1 : "rgba(128, 128, 128, 1)"
                    }
                  />
                ) : (
                  <Ionicons
                    name='eye'
                    size={18}
                    color={
                      index === 3 ? Colors.default1 : "rgba(128, 128, 128, 1)"
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
            disabled={Loading2}
          >
            {Loading2 && <ActivityIndicator size='small' color='white' />}
            <Text style={defaultStyles.btnText}>{languageText.text16}</Text>
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
        gap: 60,
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

export default ChangePassword2;
