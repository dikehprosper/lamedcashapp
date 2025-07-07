/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef, useContext} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import {Color} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {Language} from "@/constants/languages";
import PopInAnimation from "../(Utils)/AnimatedContent";
import * as ImagePicker from "expo-image-picker";

import {
  changeModalState,
  deleteLeague,
  editLeague,
  getLeague,
} from "@/state/userData/getUserData";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ToastNotification from "../(Utils)/toastNotification";
import triggerHapticFeedback from "../(Utils)/triggerHapticFeedback";
import DOMAIN from "@/components/(Utils)/domain";
import WalletModal4 from "./walletModal4";
interface Payload {
  inputedImage: any;
  email: string;
  league: string;
}

interface Payload10 {
  email: string;
}
interface Payload11 {
  id: string;
  email: string;
  image: string;
  league: string;
}

const EditSecondSectionModal = (props: any) => {
  const [league, setLeague] = useState<any>([]);
  const [inputedLeague, setInputedLeague] = useState("");

  const [inputedImage, setInputedImage] = useState<{
    assets: {uri: string}[];
  } | null>(null);

  useEffect(() => {
    getLeagueGame();
  }, []);
  const [enterLeagueState, setEnterLeagueState] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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

  function closeNotice() {
    dispatch(changeModalState())
      .then(async (result: any) => {
        console.log(result.payload, "hvdfhjvcdhjcv");
        props.hideModal();
      })
      .catch((err: any) => console.log(err));
  }

  function changeEnterLeagueState() {
    setEnterLeagueState((previous) => !previous);
  }

  // Ask for camera and media library permissions
  const requestPermissions = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
    }
  };

  // Pick an image from the gallery

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri; // Access the uri of the first image in the assets array
      setInputedImage({assets: result.assets}); // Set the assets array to the state
    }
  };

  function handleSubmitLeague() {
    setLoading(true);

    const imagePayload = inputedImage ? inputedImage.assets[0] : null;

    const payload: Payload = {
      inputedImage: imagePayload ? imagePayload : null, // Pass the URI of the image
      email: props.email, // Assuming data.email contains the user's email
      league: inputedLeague, // Assuming league contains the league name or data
    };

    dispatch(editLeague(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          console.log(result.payload.leagues, "vbfbfbfbfbfb");
          displayNotification();
          setLeague(result.payload.leagues);
          setInputedLeague("");
          setInputedImage(null);
          setEnterLeagueState(false);

          setLoading(false);
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }

  function getLeagueGame() {
    setLoading(true);

    const payload: Payload10 = {
      email: props.email,
    };

    dispatch(getLeague(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          // console.log(result.payload.leagues, "vbfbfbfbfbfb");
          setLeague(result.payload.leagues);
          setInputedLeague("");
          setInputedImage(null);
          setEnterLeagueState(false);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }
  // State for the search term

  const [searchLeague, setSearchLeague] = useState("");
  // Filtered leagues based on the search term
  const filteredLeagues = league?.filter((individual: any) =>
    individual.league.toLowerCase().startsWith(searchLeague.toLowerCase())
  );

  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const [text1, setText1] = useState(`Successful added`);
  const [text2, setText2] = useState(`Failed to add`);
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
    }, 3800);
  }

  const [modalState, setModalState] = useState(false);
  const [value, setValue] = useState<any>();

  function deleteLeagueGame(value: any) {
    console.log(value, "This is the value");

    setLoading(true);

    const payload: Payload11 = {
      id: value._id,
      image: value.image,
      email: props.email,
      league: value.league,
    };

    dispatch(deleteLeague(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          // console.log(result.payload.leagues, "vbfbfbfbfbfb");
          setLeague(result.payload.leagues);
          setInputedLeague("");
          setInputedImage(null);
          setEnterLeagueState(false);
          setLoading(false);
          closeModal();
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }

  function initiateDeleteLeague(value: any) {
    console.log(value, "value");
    setValue(value);
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
    setValue(null);
  }

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000,
        backgroundColor: Colors.background,
        top: 40,
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
      }}
    >
      {modalState && (
        <WalletModal4
          closeModal={() => closeModal()}
          // navigation={navigation}
          text={"Are you sure you want to delete this league"}
          value={value}
          value2={value.league}
          handleSubmit={deleteLeagueGame}
          loading={loading}
        />
      )}

      <WalletModal4
        closeModal={() => closeModal()}
        // navigation={navigation}
        text={"Are you sure you want to delete this league"}
        value={value}
        value2={value.league}
        handleSubmit={deleteLeagueGame}
        loading={loading}
      />

      <ToastNotification
        show={show === 0 ? true : false}
        text={display === 1 ? text1 : display === 2 ? text2 : null}
        textColor='white'
        marginTop={0}
        backgroundColor={show === 1 ? "green" : show === 2 ? "red" : null}
        icon={<AntDesign name='exclamationcircleo' size={40} color='white' />}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: Colors.background,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            marginBottom: 20,
            gap: 100,
          }}
        >
          <TouchableOpacity onPress={() => closeNotice()}>
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
            Select League
          </Text>
          <Text></Text>
        </View>

        <ScrollView
          style={{
            paddingBottom: 10,
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50, // Match the height of the ScrollView
              width: "100%",
              borderBottomWidth: 1,
              borderColor: "rgba(120, 120, 120, 0.4)",
              gap: 10,
            }}
          >
            <AntDesign name='search1' size={18} color={Colors.welcomeText} />
            <TextInput
              value={searchLeague}
              onChangeText={setSearchLeague}
              onFocus={() => setEnterLeagueState(false)}
              placeholderTextColor={Colors.placeHolderTextColor}
              autoCapitalize='none'
              placeholder='Search League'
              autoCorrect={false}
              style={{
                color: Colors.welcomeText,
                flex: 1,
                justifyContent: "flex-start",
                height: "100%", // Stretch to fill parent
                fontSize: 16,
                fontWeight: "500",
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => changeEnterLeagueState()}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: 50, // Match the height of the ScrollView
              width: "100%",
              gap: 10,
              marginTop: 25,
            }}
          >
            <AntDesign
              name='plus'
              size={24}
              color={Colors.placeHolderTextColor}
            />
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: Colors.placeHolderTextColor,
              }}
            >
              Add League
            </Text>
          </TouchableOpacity>
          {enterLeagueState && (
            <View style={{marginTop: 15}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50, // Match the height of the ScrollView
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: "rgba(120, 120, 120, 0.4)",
                  gap: 10,
                }}
              >
                <TextInput
                  value={inputedLeague}
                  onChangeText={setInputedLeague}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='Enter League'
                  autoCorrect={false}
                  style={{
                    color: Colors.welcomeText,
                    flex: 1,
                    justifyContent: "flex-start",
                    height: "100%", // Stretch to fill parent
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={handlePickImage}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: 50, // Match the height of the ScrollView
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: "rgba(120, 120, 120, 0.4)",
                  gap: 10,
                  marginTop: 18,
                }}
              >
                {inputedImage && inputedImage.assets[0] ? (
                  <Image
                    source={{uri: inputedImage.assets[0].uri}}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 3,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: Colors.placeHolderTextColor,
                    }}
                  >
                    Upload Flag
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitLeague}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50, // Match the height of the ScrollView
                  width: "100%",
                  gap: 10,
                  marginTop: 50,
                  borderColor: "rgba(120, 120, 120,1)",
                  borderRadius: 5,
                  borderWidth: 1.5,
                }}
              >
                {loading && (
                  <ActivityIndicator size='small' color={Colors.welcomeText} />
                )}
                <Text style={{color: Colors.welcomeText, fontWeight: "600"}}>
                  Create League
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              flex: 1,
              width: "100%",
              gap: 10,
              marginTop: 50,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 19,
                color: Colors.welcomeText,
              }}
            >
              LEAGUES
            </Text>
            <ScrollView
              style={{
                flex: 1,
                width: "100%",
              }}
              automaticallyAdjustKeyboardInsets={true}
              alwaysBounceVertical={true}
              showsVerticalScrollIndicator={false}
            >
              {filteredLeagues.length > 0 ? (
                filteredLeagues.map((individual: any, index: any) => (
                  <Leagues
                    key={individual?.id || index}
                    Colors={Colors}
                    individual={individual}
                    initiateDeleteLeague={initiateDeleteLeague}
                    handleSubmit={props.handleSubmit}
                  />
                ))
              ) : league.length > 0 ? (
                league.map((individual: any, index: any) => (
                  <Leagues
                    key={individual?.id || index}
                    Colors={Colors}
                    individual={individual}
                    initiateDeleteLeague={initiateDeleteLeague}
                    handleSubmit={props.handleSubmit}
                  />
                ))
              ) : (
                <Text
                  style={{
                    marginTop: 80,
                    fontSize: 20,
                    color: Colors.welcomeText,
                    opacity: 0.4,
                    alignSelf: "center",
                  }}
                >
                  Saved Leagues shows up here
                </Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditSecondSectionModal;

function Leagues({
  Colors,
  individual,
  initiateDeleteLeague,
  handleSubmit,
}: any) {
  console.log(individual, "individual");
  return (
    <View>
      <TouchableOpacity
        onPress={() => handleSubmit(individual)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 40,
          width: "100%",
          gap: 10,
          marginTop: 14,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
          }}
        >
          {individual.image === "" ? (
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
              source={{uri: `${DOMAIN}/${individual.image}`}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 3,
                opacity: 0.7,
              }}
            />
          )}
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: Colors.welcomeText,
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            {individual.league}
          </Text>
        </View>

        <TouchableOpacity
          // onPress={() => closeNotice()}
          style={{padding: 10}}
          onPress={() => initiateDeleteLeague(individual)}
        >
          <AntDesign name='delete' size={20} color={Colors.welcomeText} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
