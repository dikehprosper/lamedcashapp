/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Skeleton from "../components/Skeleton";
import StatusContent from "../components/statusContent";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Clipboard,
    ActivityIndicator,
} from "react-native";
import { TextInput } from "@react-native-material/core";
import {
    FontAwesome5,
    Ionicons,
    FontAwesome6,
    AntDesign,
    Octicons,
} from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import { Color } from "@/constants/Colors";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getTotalReferral, resetTag } from "@/state/userData/getUserData";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";
const Tab = createMaterialTopTabNavigator();

interface formData {
    tag: string;
    email: string;
}

const ReferralStack = ({navigation}: any) => {
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

  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const [displayText, setDisplayText] = useState<any>();

  const icon1 = (
    <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
  );
  const icon2 = (
    <AntDesign name='exclamationcircleo' size={40} color={Colors.toastText} />
  );

  function displayNotification(text: any) {
    setShow(1);
    setDisplay(1);
    triggerHapticFeedback();
    Clipboard.setString(text);
    setDisplayText(languageText.text339);
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification3(text: any) {
    console.log("text2");
    setShow(2);
    setDisplay(2);
    triggerHapticFeedback();
    setDisplayText(text);
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification4(text: any) {
    console.log("text3");
    setShow(3);
    setDisplay(3);
    triggerHapticFeedback();
    setDisplayText(text);
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification5(text: any) {
    console.log("text3");
    setShow(5);
    setDisplay(5);
    triggerHapticFeedback();
    setDisplayText(text);
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={{flex: 1}}>
      <ExploreHeader5 />

      <View
        style={[
          styles.externalContainer,
          {
            backgroundColor: Colors.background,
          },
        ]}
      >
        <ToastNotification
          show={show === 0 ? true : false}
          text={displayText}
          textColor={display === 1 ? Colors.toastText : "white"}
          backgroundColor={
            display === 1 ? Colors.welcomeText : display === 5 ? "green" : "red"
          }
          icon={
            display === 1 || display === 5 ? (
              <AntDesign name='checkcircleo' size={40} color='white' />
            ) : (
              <AntDesign
                name='exclamationcircleo'
                size={40}
                color={Colors.toastText}
              />
            )
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24,
            paddingHorizontal: 20,
            paddingTop: 20,
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
            {languageText.text196}
          </Text>
          <Text></Text>
        </View>
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen
            name='Inviter'
            component={Invite}
            initialParams={{
              displayNotification,
              navigation: navigation,
              displayNotification3,
              displayNotification4,
              displayNotification5,
            }}
          />
          <Tab.Screen
            name='Statut'
            component={Status}
            initialParams={{
              displayNotification,
              navigation: navigation,
              displayNotification3,
              displayNotification4,
              displayNotification5,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default ReferralStack;

function Status({route, navigation}: any) {
  const data = useSelector((state: RootState) => state.getUserData.data);
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const [referral, setReferral] = useState<any>();

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  useEffect(() => {
    const formData: any = {
      email: data.email,
    };
    dispatch(getTotalReferral(formData))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          triggerHapticFeedback();
          setReferral(result.payload.filteredReferralUsers);
          setLoading(false);
        }
        if (result.payload.status === 501 || result.payload.status === 502) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          triggerHapticFeedback();
          setLoading(false);
        }
      })
      .catch((err: any) => console.log(err));
  }, []);

  return loading ? (
    // <Skeleton width={"100%"} height={20} />
    <></>
  ) : (
    <StatusContent referral={referral} />
  );
}

function Invite({route, navigation}: any) {
  const data = useSelector((state: RootState) => state.getUserData.data);

  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  const {
    displayNotification,
    displayNotification3,
    displayNotification4,
    displayNotification5,
  } = route.params;

  const [visibility, setVisibility] = useState(true);
  const [tag, setTag] = useState<any>("");

  function changeVisibilityToTrue() {
    setVisibility(true);
  }
  function changeVisibilityToFalse() {
    setVisibility(false);
  }

  const dispatch = useDispatch<AppDispatch>();
  const [loading2, setLoading2] = useState(false);
  const [suggestions, setSuggestions] = useState<any>();

  function selectTag(data: any) {
    console.log(data);
    setTag(data);
  }

  function handleSubmit() {
    setLoading2(true);
    setSuggestions(null);

    if (tag === "") {
      setLoading2(false);

      return;
    }

    const formData: formData = {
      tag: tag,
      email: data.email,
    };
    dispatch(resetTag(formData))
      .then(async (result: any) => {
        console.log(result.payload.suggestions, "jjjjjj");
        if (result.payload.success === true) {
          displayNotification5(languageText.text304);
          setLoading2(false);
        }
        if (result.payload.status === 501) {
          // displayNotification();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          setLoading2(false);
        }
        if (result.payload.status === 502) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          setLoading2(false);
        }

        if (result.payload.status === 503) {
          displayNotification3(languageText.text305);
          setLoading2(false);
        }

        if (result.payload.status === 504) {
          setSuggestions(result.payload.suggestions);
          displayNotification4(languageText.text306);
          setLoading2(false);
        }
        if (result.payload.status === 505 || result.payload.status === 505) {
          //  displayNotification4();
          setLoading2(false);
        }
      })
      .catch((err: any) => console.log(err));
  }

  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
      }}
    >
      <View style={[styles.container, {backgroundColor: Colors.background}]}>
        <ScrollView
          scrollEnabled={true}
          automaticallyAdjustKeyboardInsets={true}
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          style={{height: "100%"}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              margin: 30,
            }}
          >
            <View>
              <FontAwesome6
                name='people-arrows'
                size={110}
                color={Colors.default1}
              />
            </View>
          </View>

          <View style={{flex: 1, justifyContent: "center"}}>
            {/* MIddle Text */}
            <View style={styles.topSection}>
              <View style={styles.midText}>
                <Text
                  style={[styles.referralText, {color: Colors.welcomeText}]}
                >
                  {languageText.text294}
                </Text>
                <Text style={styles.descriptionText}>
                  {languageText.text293}
                </Text>
              </View>
            </View>
          </View>
          {visibility ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <View style={styles.codeSection}>
                  <Text style={styles.codeText}>{languageText.text295}</Text>
                  <View
                    style={[
                      styles.codeContainer,
                      {
                        backgroundColor: Colors.background,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.referralCode,
                        {
                          color: Colors.welcomeText,
                        },
                      ]}
                    >
                      {data.tag}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.copyButtonContainer,
                        {
                          backgroundColor: Colors.default3,
                        },
                      ]}
                      onPress={() => displayNotification(data.tag)}
                    >
                      <FontAwesome5
                        name='copy'
                        size={18}
                        color={Colors.default1}
                      />
                      <Text style={styles.copyButton}>
                        {languageText.text296}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                }}
                onPress={changeVisibilityToFalse}
              >
                <Text
                  style={{
                    color: Colors.default1,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {languageText.text297}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <View style={styles.codeSection}>
                  <Text style={styles.codeText2}>{languageText.text298}</Text>
                  <View
                    style={[
                      styles.codeContainer2,
                      {
                        backgroundColor: Colors.background,
                        flex: 1,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",

                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        // ref={inputRef}
                        variant='outlined'
                        label={languageText.text299}
                        value={tag}
                        onChangeText={setTag}
                        autoCorrect={false}
                        placeholderTextColor={Colors.placeHolderTextColor}
                        color={Colors.default1}
                        autoCapitalize='none'
                        style={[
                          {
                            flex: 1,
                            height: 64,
                            marginRight: 3,
                          },
                        ]}
                        selectionColor={Colors.default1}
                      />
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          width: "25%",
                          height: 56,
                          borderRadius: 4,
                          justifyContent: "center",
                          backgroundColor: Colors.default1,
                          marginBottom: 8,
                          flexDirection: "row",
                          gap: 5,
                        }}
                        onPress={handleSubmit}
                      >
                        {loading2 ? (
                          <ActivityIndicator color={"white"} />
                        ) : null}
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        >
                          {languageText.text300}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {suggestions && (
                <>
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-start",
                    }}
                    onPress={changeVisibilityToTrue}
                  >
                    <Text
                      style={{
                        color: Colors.welcomeText,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      suggestions:
                    </Text>
                  </TouchableOpacity>
                  <ScrollView
                    horizontal
                    scrollEnabled={true}
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flex: 1,
                      gap: 20,
                      marginBottom: 18,
                    }}
                  >
                    {suggestions?.map(
                      (dataz: any, index: React.Key | null | undefined) => {
                        return (
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              paddingVertical: 5,
                              marginVertical: 5,
                              paddingHorizontal: 5,
                              marginHorizontal: 10,
                              flexDirection: "row",
                              gap: 8,
                            }}
                            onPress={() => selectTag(dataz)}
                            key={index}
                          >
                            <Text
                              style={{
                                color: Colors.welcomeText,
                                fontSize: 14,
                                fontWeight: "600",
                                gap: 20,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {dataz === tag ? (
                                <Octicons
                                  name='dot-fill'
                                  size={35}
                                  color={Colors.welcomeText}
                                />
                              ) : (
                                <Octicons
                                  name='dot'
                                  size={35}
                                  color={Colors.welcomeText}
                                />
                              )}
                            </Text>
                            <Text
                              style={{
                                color: Colors.welcomeText,
                                fontSize: 14,
                                fontWeight: "600",
                                gap: 20,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {dataz}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </ScrollView>
                </>
              )}

              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  marginBottom: 30,
                }}
                onPress={changeVisibilityToTrue}
              >
                <Text
                  style={{
                    color: Colors.default1,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {languageText.text302}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Feel is Pressed");
            }}
          >
            <Text style={styles.buttonText}>{languageText.text303}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading2 && (
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></View>
      )}
    </View>
  );
}

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.container66}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = label === "Inviter" ? "person-add" : "stats-chart";

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#00A86B" : "#888"}
            />
            <Text
              style={{
                color: isFocused ? "#00A86B" : "#888",
                fontWeight: isFocused ? "bold" : "500",
                fontSize: 13,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container66: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00A86B",
    paddingBottom: 4,
  },
  externalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingVertical: 20,

    justifyContent: "space-between",
    height: "100%",
    //  alignItems: 'center',
  },
  header: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  paragraphStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: "#888", //Light gray color
  },
  topSection: {
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  midText: {
    // width: 100%,
    // display: row,
    alignItems: "center",
  },
  referralText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 19.5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: "center",
    alignSelf: "center",
    lineHeight: 20,
    fontSize: 16,
    color: "#888", //Light gray color
  },
  button: {
    backgroundColor: "#4fa66a",
    padding: 14,
    borderRadius: 5,
    width: "100%", // Take up the entire width

    //  flexDirection: 'row',
    //  alignItems: 'center',
    //  justifyContent: 'space-between',
    //  padding: 15,
    //  backgroundColor: '#4CAF50',
    //  borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text
    textAlign: "center",
    fontWeight: "bold",
  },
  codeText: {
    fontSize: 15.5,
    marginBottom: 10,
    fontWeight: "500",
    color: "#888", //Light gray color
  },
  codeText2: {
    fontSize: 13.5,
    marginBottom: 10,
    fontWeight: "500",
    color: "#888", //Light gray color
  },
  codeContainer: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 17,
    borderWidth: 1.4,
    borderColor: "#4fa66a",
    width: "100%",
  },
  codeContainer2: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 17,

    width: "100%",
  },
  copyButton: {
    marginLeft: 10,
    // backgroundColor: '#f0c600', // Orange color as in the image
    color: "#4fa66a", // White text color
    fontSize: 12,
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  referralCode: {
    flex: 1,
    fontSize: 15,
    fontWeight: 800,
  },
  codeSection: {
    marginBottom: 5,
  },

  copyButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 36,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  copyButtonClick: {
    backgroundColor: "#f0c600", // Orange color as in the image
    color: "red", // White text color
    fontSize: 10, // Adjust font size as needed
  },
});
