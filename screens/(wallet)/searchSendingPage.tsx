/* eslint-disable */

import ExploreHeader from "@/components/ExploreHeader";
import React, {useState, useEffect, useRef} from "react";
import * as Haptics from "expo-haptics";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,

  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  useWindowDimensions,
  Pressable,
  Vibration,
  Keyboard,
  Switch,
  SectionList,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
<MaterialCommunityIcons name='hand-wave-outline' size={24} color='black' />;
const screenHeight = Dimensions.get("window").height;
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {defaultStyles} from "@/constants/Styles";
const Stack = createNativeStackNavigator();
import ExploreHeader3 from "@/components/ExploreHeader3";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Color } from "@/constants/Colors";
import SentSearchList from "@/components/(receipt)/sentSearchList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import Skeleton from "@/components/skeleton2";
import { Language } from "@/constants/languages";
import { searchSendingPage } from "@/state/userData/getUserData";

const DOMAIN = process.env.DOMAIN;

const filteredData2 = [
    {
        _id: "",
        name: "",
    },
];
// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;

const SearchSendingPage = (props: any) => {
  const data = useSelector((state: RootState) => state.getUserData.data);
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

  const [index, setIndex] = useState(0);
  // EXTRA SETTINGS ........
  // Input fucus and blur setting
  async function setItemOnFocus(index: React.SetStateAction<number>) {
    setIndex(index);
  }

  function setItemOnBlur() {
    setIndex(0);
  }

  //function to close keyboard
  const inputRef = useRef<TextInput>(null);

  const handleDismissKeyboard = () => {
    inputRef.current?.blur();
  };

  const [value, setValue] = useState<any>("");
  const [filteredData, setFilteredData] = useState<any>();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      handleSubmit();
    }
  }, [value]);

  const [Loading2, setLoading2] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit() {
    const formData: any = {
      value: value,
      _id: data._id,
    };
    setLoading2(true);
    dispatch(searchSendingPage(formData))
      .then(async (resultData: any) => {
        setLoading2(false);

        const result = resultData.payload.search.filter(
          (item: {_id: any}) => item._id !== formData._id
        );

        console.log(result, "resultData");
        setFilteredData(result);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading2(false);
      });
  }

  useEffect(() => {
    if (value === "") {
      setFilteredData("");
    }
  });

  //FOR TOAstNotification
  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const text1 = `L'utilisateur n'existe pas`;
  const text2 = `L'utilisateur est désactivé`;
  const text3 = `Actuellement en maintenance`;
  const text4 = `Impossible de lancer la transaction`;

  const icon1 = (
    <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
  );
  const icon2 = (
    <AntDesign name='exclamationcircleo' size={40} color={Colors.toastText} />
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
  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ExploreHeader3 />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
      >
        <View style={styles.transaction_template_container_header_1}>
          <TouchableOpacity
            onPressIn={() => props.navigation.goBack()}
            style={{
              paddingTop: 3,
              paddingBottom: 3,
              paddingRight: 3,
              backgroundColor: "transparent",
              borderColor: Colors.welcomeText,
              opacity: 0.6,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <MaterialIcons
              name='arrow-back-ios-new'
              size={21}
              color={Colors.welcomeText}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.welcomeText,
              fontWeight: "600",
              opacity: 0.8,
              fontSize: 21,
            }}
          >
            {languageText.text268}
          </Text>
          <View></View>
        </View>
        <ToastNotification
          show={show === 0 ? true : false}
          text={
            display === 1
              ? text1
              : display === 2
              ? text2
              : display === 3
              ? text3
              : text4
          }
          textColor='white'
          backgroundColor='red'
          icon={<AntDesign name='exclamationcircleo' size={40} color='white' />}
        />

        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <View style={styles.container3}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 8,
                marginBottom: 14,
                padding: 8,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 22,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,
                  borderColor: index === 1 ? Colors.default1 : "transparent",
                  borderWidth: 1.5,
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    paddingLeft: 14,
                    paddingRight: 3.4,
                    opacity: 1,
                  }}
                >
                  <FontAwesome
                    name='search'
                    size={20}
                    color={
                      index === 1 ? Colors.default1 : "rgba(128, 128, 128, 0.7)"
                    }
                  />
                </Text>
                <TextInput
                  value={value}
                  onChangeText={setValue}
                  onFocus={() => setItemOnFocus(1)}
                  onBlur={setItemOnBlur}
                  autoCorrect={false}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='Recherche ...'
                  style={[
                    defaultStyles.inputField,
                    {
                      fontSize: 19,
                      fontWeight: "500",
                      color: Colors.welcomeText,
                      height: 54,
                    },
                  ]}
                  selectionColor={Colors.default1}
                  // onEndEditing={handleSubmit}
                ></TextInput>
              </View>
            </View>
            {Loading2 ? (
              <View
                style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: 10,
                }}
              >
                {/* <Skeleton width={"100%"} height={60} /> */}
              </View>
            ) : filteredData?.length < 1 || filteredData === undefined ? (
              <Text
                style={{
                  color: Colors.welcomeText,
                  fontSize: 15,
                  fontWeight: "600",
                  width: "80%",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                {languageText.text269}
              </Text>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                data={filteredData}
                renderItem={({item}) => (
                  <SentSearchList
                    specificData={item}
                    navigation={props.navigation}
                  />
                )}
              />
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 8,
                padding: 8,
                borderRadius: 5,
                flex: 1,
              }}
            ></View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        height: percentageHeight,
    },
    container2: {
        alignSelf: "center",
        height: 100,
        position: "relative",
        marginBottom: 10,

        width: "100%",
        borderRadius: 12,
    },
    container3: {
        display: "flex",
        borderRadius: 8,
        flex: 1,
        height: percentageHeight2,
        paddingHorizontal: 12,
    },
    xxxx: {
        fontWeight: "900",

        fontSize: 28,
    },
    xxxxx: {
        fontWeight: "300",

        fontSize: 16,
    },
    transaction_template_container_header_1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "700",
        flexDirection: "row",
        padding: 15,
    },
    child: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
    },
    switchContainer: {
        transform: [{ scaleX: 1 }, { scaleY: 0.8 }], // Scale the switch up to 150% of its original size
    },
});

export default SearchSendingPage;
