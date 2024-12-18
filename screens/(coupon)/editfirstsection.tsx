/* eslint-disable */

import React, {useState, useEffect, useRef} from "react";
import {
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Keyboard,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ExploreHeader3 from "@/components/ExploreHeader3";
import {defaultStyles} from "@/constants/Styles";
import Loader from "@/components/(Utils)/loader";
import ValidateTextInput from "@/components/(Utils)/ValidateTextInput";
import CountryCode from "@/components/(Utils)/countrySelector";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import * as Haptics from "expo-haptics";
import ToastNotification from "@/components/(Utils)/toastNotification";
import {Color} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {changeUserDetails} from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "@/components/loadingComponent";
import ExploreHeader5 from "@/components/ExploreHeader5";
import {CommonActions} from "@react-navigation/native";
import {Language} from "@/constants/languages";

// Calculate the percentage value

interface FormData2 {
  fullname: string;
  email: string;
  number: string | number;
  betId: string;
}
const EditFirstSection = ({navigation}: any) => {
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
  const isLoading = useSelector(
    (state: RootState) => state.getUserData.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [iconVisibility, setIconVisibility] = useState(false);
  const [validationMessage, SetValidationMessage] = useState("");
  const [index, setIndex] = useState(0);

  // All inputs data initial state
  const [fullname, setFullname] = useState(data.fullname);
  const [email, setEmail] = useState(data.email);
  const [number, setNumber] = useState(data.number.toString());
  const [betId, setBetId] = useState(data.betId);

  // SETTING MARGIN BOTTOM WHEN KEYBOARD IS BEING DISPLAYED
  // EXTRA SETTINGS ........
  // Input fucus and blur setting
  async function setItemOnFocus(index: React.SetStateAction<number>) {
    setReOccur(true);
    setIndex(index);
  }

  function setItemOnBlur() {
    Keyboard.dismiss();
    setIndex(0);
    // if (betId === "") {
    //   setBetIdError(false);
    // }
  }

 
 
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);
  const inputRef5 = useRef<TextInput>(null);
  const inputRef6 = useRef<TextInput>(null);
  const inputRef7 = useRef<TextInput>(null);
  const handleDismissKeyboard = () => {
    inputRef.current?.blur();
    inputRef2.current?.blur();
    inputRef3.current?.blur();
    inputRef4.current?.blur();
    inputRef5.current?.blur();
    inputRef6.current?.blur();
    inputRef7.current?.blur();
  };

 
  // const [screenheight, setScreenHeight] = useState({screenheight: 0})
  // function onContentSizeChange(contentWidth: any, contentHeight: any) {
  // setScreenHeight({screenheight: 3000})
  // }
  //  const [height, setHeight] = useState(0);

  //  const onLayout = (event: any) => {
  //    const {height: newHeight} = event.nativeEvent.layout;
  //    setHeight(newHeight);
  //  };
  // const scrollEnabled = screenheight.screenheight !== height;

//   function handleSubmit() {
//     if (loading2) return;
//     setLoading2(true);
//     if (fullnameLoadingSymbol !== "false") {
//       setFullNameError(true);
//       setTriggerFullNameRevalidation2(true);
//     }
//     if (emailLoadingSymbol !== "false") {
//       setEmailError(true);
//       setTriggerEmailRevalidation2(true);
//     }

//     if (phoneNumberLoadingSymbol !== "false") {
//       setPhoneNumberError(true);
//       setTriggerPhoneNumberRevalidation2(true);
//     }
//     if (betIdLoadingSymbol !== "false") {
//       setBetIdError(true);
//       setTriggerBetIdRevalidation2(true);
//     }

//     if (
//       fullnameLoadingSymbol !== "false" ||
//       emailLoadingSymbol !== "false" ||
//       phoneNumberLoadingSymbol !== "false" ||
//       betIdLoadingSymbol !== "false"
//     ) {
//       setLoading2(false);
//       return;
//     }

//     const formData: FormData2 = {
//       fullname: fullname,
//       email: email,
//       number: number,
//       betId: betId,
//     };
//     dispatch(changeUserDetails(formData))
//       .then(async (result) => {
//         if (result.payload.success === true) {
//           displayNotification2();

//           setLoading2(false);
//         }
//         if (result.payload.status === 402) {
//           displayNotification3();
//           setLoading2(false);
//         }
//         if (result.payload.status === 400) {
//           displayNotification4();
//           setLoading2(false);
//         }
//         if (result.payload.status === 502) {
//           navigation.dispatch(
//             CommonActions.reset({
//               index: 0,
//               routes: [{name: "login"}],
//             })
//           );
//           setLoading2(false);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         displayNotification3();
//         setLoading2(false);
//       });
//   }

  //FOR TOAST NOTIFICATION
  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const text1 = languageText.text19;
  const text2 = languageText.text125;
  const text3 = languageText.text126;
  const text4 = languageText.text127;

  const icon1 = (
    <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
  );
  const icon2 = (
    <AntDesign name='exclamationcircleo' size={40} color={Colors.toastText} />
  );

  function displayNotification1() {
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
    }, 3800);
  }
  function displayNotification3() {
    setShow(3);
    setDisplay(3);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification4() {
    setShow(4);
    setDisplay(4);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isLoading && <LoadingComponent />}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          position: "relative",
        }}
      >
        <ExploreHeader5 />
        <StatusBar backgroundColor={Colors.background} />

        <ToastNotification
          show={show === 0 ? true : false}
          text={
            display === 1
              ? text1
              : show === 2
                ? text2
                : show === 3
                  ? text3
                  : text4
          }
          textColor={Colors.toastText}
          marginTop={Platform.OS === "ios" ? 0 : 0}
          backgroundColor={
            display === 1
              ? "red"
              : display === 2
                ? "green"
                : display === 3
                  ? "red"
                  : "red"
          }
          icon={
            display === 1
              ? icon2
              : display === 2
                ? icon1
                : display === 3
                  ? icon2
                  : icon2
          }
        />
        <View style={[styles.container, {}]}>
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
              {languageText.text375}
            </Text>
            <Text></Text>
          </View>

          <ScrollView
            style={{
              gap: 20,
              paddingVertical: 20,
              paddingBottom: 10,
              flex: 8,
              backgroundColor: Colors.background,
            }}
            scrollEnabled={true}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {languageText.text122}
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  position: "relative",
                }}
              >
                <TextInput
                  ref={inputRef}
                  value={fullname}
                  onChangeText={setFullname}
                  // onChange={SignUpFullnameReVerification}
                  onFocus={() => setItemOnFocus(1)}
                  onBlur={setItemOnBlur}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder={languageText.text27}
                  autoCorrect={false}
                  style={[
                    defaultStyles.inputField,
                    {color: Colors.welcomeText},
                  ]}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  marginTop: 20,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                E-mail
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,

                  borderWidth: 1.5,
                  position: "relative",
                }}
              >
                <TextInput
                  ref={inputRef2}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setItemOnFocus(2)}
                  onBlur={setItemOnBlur}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='E-mail'
                  autoCorrect={false}
                  style={[
                    defaultStyles.inputField,
                    {color: Colors.welcomeText},
                  ]}
                ></TextInput>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  marginTop: 20,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                ID
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  position: "relative",
                }}
              >
                <TextInput
                  ref={
                    Platform.OS === "ios" || Platform.OS === "android"
                      ? inputRef3
                      : null
                  }
                  value={betId}
                  onChangeText={setBetId}
                  onFocus={() => setItemOnFocus(3)}
                  onBlur={setItemOnBlur}
                  autoCorrect={false}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='identifiant'
                  style={[
                    defaultStyles.inputField,
                    {color: Colors.welcomeText},
                  ]}
                  selectionColor={Colors.default1}
                  keyboardType='number-pad'
                ></TextInput>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.default1,
                height: 48,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: 100,
                marginBottom: 40,
                opacity: loading2 ? 0.5 : 1,
              }}
              //   onPress={handleSubmit}
              disabled={loading2}
            >
              {loading2 && <ActivityIndicator size='small' color='white' />}
              <Text style={defaultStyles.btnText}>{languageText.text375}</Text>
            </TouchableOpacity>
          </ScrollView>

          <Loader visible={loading} />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,

    position: "relative",
  },
  transaction_template_container_header_1: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "700",
    gap: 12,
    flexDirection: "row",
    flex: 0.5,
  },
  container2: {
    display: "flex",
    gap: 3,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    flex: 1.2,
  },
});

export default EditFirstSection;
