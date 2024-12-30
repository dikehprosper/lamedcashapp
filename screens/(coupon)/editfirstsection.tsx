/* eslint-disable */

import React, {useState, useEffect, useRef, useContext} from "react";
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
  Image,
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
import {
  changeUserDetails,
  createMatchPrediction,
  createMatchPrediction2,
} from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "@/components/loadingComponent";
import ExploreHeader5 from "@/components/ExploreHeader5";
import {CommonActions} from "@react-navigation/native";
import {Language} from "@/constants/languages";
import ModalContext from "@/components/modalContext";
import WalletModal3 from "@/components/(modals)/walletModal3";
import EditSecondSectionModal from "@/components/(modals)/editSecondSectionModal";
import DOMAIN from "@/components/(Utils)/domain";
import EditSecondSectionModal2 from "@/components/(modals)/editSecondSectionModal2";
// Calculate the percentage value

interface FormData2 {
  fullname: string;
  email: string;
  number: string | number;
  betId: string;
}
interface MatchPredictionPayload {
  time?: string;
  team1?: string;
  team1_flag?: string;
  team2?: string;
  team2_flag?: string;
  league?: string;
  league_flag?: string;
  tip?: string;
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
  const [loading2, setLoading2] = useState(true);
  const [iconVisibility, setIconVisibility] = useState(false);
  const [validationMessage, SetValidationMessage] = useState("");
  const [index, setIndex] = useState(0);

  // All inputs data initial state
  const [team1, setTeam1] = useState<any>();
  const [team2, setTeam2] = useState<any>();
  const [time, setTime] = useState("");
  const [league, setLeague] = useState<any>();
  const [tip, setTip] = useState("");
  const [status, setStatus] = useState("");

  //FOR TOAST NOTIFICATION
  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const text1 = "Successfully added";
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

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("HomeScreen must be used within a ModalProvider");
  }
  const {showModal, hideModal} = modalContext;
  function openLeagueSelection(email: any) {
    showModal(
      <EditSecondSectionModal
        hideModal={hideModal}
        navigation={navigation}
        email={email}
        handleSubmit={handleSubmit}
      />
    );
  }
  function openTeam1Selection(email: any) {
    showModal(
      <EditSecondSectionModal2
        hideModal={hideModal}
        navigation={navigation}
        email={email}
        handleSubmit={handleSubmit2}
      />
    );
  }

  function openTeam2Selection(email: any) {
    showModal(
      <EditSecondSectionModal2
        hideModal={hideModal}
        navigation={navigation}
        email={email}
        handleSubmit={handleSubmit3}
      />
    );
  }

  function handleSubmit(value: any) {
    hideModal();
    setLeague(value);
  }

  function handleSubmit2(value: any) {
    hideModal();
    setTeam1(value);
  }

  function handleSubmit3(value: any) {
    hideModal();
    setTeam2(value);
  }

  useEffect(() => {
    if (time && team1 && team2 && tip && league) {
      setLoading2(false);
    }
  });

  function handleSubmitAll() {
    setLoading2(true);
    setLoading(true);
    const payload: MatchPredictionPayload = {
      time: time,
      team1: team1.team,
      team1_flag: team1.image,
      team2: team2.team,
      team2_flag: team2.image,
      league: league.league,
      league_flag: league.image,
      tip: tip,
    };

    dispatch(createMatchPrediction2(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          displayNotification1();

          setLoading(false);
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }

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
              ? "green"
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
            <Text
              style={{
                fontSize: 18,
                color: Colors.welcomeText,
                marginBottom: 10,
              }}
            >
              League
            </Text>

            <TouchableOpacity
              onPress={() => openLeagueSelection(data.email)}
              style={{
                height: 50,
                justifyContent: "space-between",
                paddingLeft: 10,
                borderBottomWidth: 1,
                borderColor: "rgba(120, 120, 120, 0.4)",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {league ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.welcomeText,
                    }}
                  >
                    {league.league}
                  </Text>
                  {league.image === "" ? (
                    <FontAwesome6
                      name='bolt-lightning'
                      size={19}
                      color={Colors.welcomeText}
                      style={{
                        borderColor: "rgba(120, 120, 120, 0.5)",
                        borderWidth: 1,
                        padding: 6,
                        borderRadius: 3,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: `${DOMAIN}/${league.image}`}}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 3,
                        opacity: 1,
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.placeHolderTextColor,
                    }}
                  >
                    Select League
                  </Text>
                  <Ionicons
                    name='chevron-forward-outline'
                    size={22}
                    color={Colors.placeHolderTextColor}
                  />
                </>
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: Colors.welcomeText,
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              Team 1
            </Text>
            <TouchableOpacity
              onPress={() => openTeam1Selection(data.email)}
              style={{
                height: 50,
                justifyContent: "space-between",
                paddingLeft: 10,
                borderBottomWidth: 1,
                borderColor: "rgba(120, 120, 120, 0.4)",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {team1 ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.welcomeText,
                    }}
                  >
                    {team1.team}
                  </Text>

                  {team1.image === "" ? (
                    <FontAwesome6
                      name='bolt-lightning'
                      size={19}
                      color={Colors.welcomeText}
                      style={{
                        borderColor: "rgba(120, 120, 120, 0.5)",
                        borderWidth: 1,
                        padding: 6,
                        borderRadius: 3,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: `${DOMAIN}/${team1.image}`}}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 3,
                        opacity: 1,
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.placeHolderTextColor,
                    }}
                  >
                    Select Team 1
                  </Text>
                  <Ionicons
                    name='chevron-forward-outline'
                    size={22}
                    color={Colors.placeHolderTextColor}
                  />
                </>
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                color: Colors.welcomeText,
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              Team 2
            </Text>
            <TouchableOpacity
              onPress={() => openTeam2Selection(data.email)}
              style={{
                height: 50,
                justifyContent: "space-between",
                paddingLeft: 10,
                borderBottomWidth: 1,
                borderColor: "rgba(120, 120, 120, 0.4)",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {team2 ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.welcomeText,
                    }}
                  >
                    {team2.team}
                  </Text>

                  {team2.image === "" ? (
                    <FontAwesome6
                      name='bolt-lightning'
                      size={19}
                      color={Colors.welcomeText}
                      style={{
                        borderColor: "rgba(120, 120, 120, 0.5)",
                        borderWidth: 1,
                        padding: 6,
                        borderRadius: 3,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: `${DOMAIN}/${team2.image}`}}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 3,
                        opacity: 1,
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.placeHolderTextColor,
                    }}
                  >
                    Select Team 2
                  </Text>
                  <Ionicons
                    name='chevron-forward-outline'
                    size={22}
                    color={Colors.placeHolderTextColor}
                  />
                </>
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                color: Colors.welcomeText,
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              Time
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                value={time}
                onChangeText={setTime}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder='Enter Time'
                autoCorrect={false}
                style={[
                  {
                    color: Colors.welcomeText,
                    height: 50,
                    justifyContent: "flex-start",
                    width: "100%",
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    borderColor: "rgba(120, 120, 120, 0.4)",
                    fontSize: 16,
                    fontWeight: "500",
                  },
                ]}
              ></TextInput>
            </View>
            <Text
              style={{
                fontSize: 18,
                color: Colors.welcomeText,
                marginTop: 25,
                marginBottom: 10,
              }}
            >
              Tip
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                value={tip}
                onChangeText={setTip}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder='Enter Tip'
                autoCorrect={false}
                style={[
                  {
                    color: Colors.welcomeText,
                    height: 50,
                    justifyContent: "flex-start",
                    width: "100%",
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    borderColor: "rgba(120, 120, 120, 0.4)",
                    fontSize: 16,
                    fontWeight: "500",
                  },
                ]}
              ></TextInput>
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
              onPress={handleSubmitAll}
              disabled={loading2}
            >
              {loading && <ActivityIndicator size='small' color='white' />}
              <Text style={defaultStyles.btnText}>{languageText.text375}</Text>
            </TouchableOpacity>
          </ScrollView>
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

