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
  deleteTeam,
  editLeague,
  editTeam,
  getLeague,
  getTeam,
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
interface TeamPayload {
  inputedImage: any;
  email: string;
  team: string;
}
interface Payload10 {
  email: string;
}
interface Payload11 {
  id: string;
  email: string;
  image: string;
  team: string;
}

const EditSecondSectionModal = (props: any) => {
  const [team, setTeam] = useState<any>([]);
  const [inputedTeam, setInputedTeam] = useState("");

  const [inputedImage, setInputedImage] = useState<{
    assets: {uri: string}[];
  } | null>(null);

  useEffect(() => {
    getTeamGame();
  }, []);
  const [enterTeamState, setEnterTeamState] = useState(false);
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

  function changeEnterTeamState() {
    setEnterTeamState((previous) => !previous);
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

  function handleSubmitTeam() {
    setLoading(true);

    const imagePayload = inputedImage ? inputedImage.assets[0] : null;

    const payload: TeamPayload = {
      inputedImage: imagePayload ? imagePayload : null, // Pass the URI of the image
      email: props.email, // Assuming data.email contains the user's email
      team: inputedTeam, // Assuming team contains the team name or data
    };

    dispatch(editTeam(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          displayNotification();
          setTeam(result.payload.allTeams);
          setInputedTeam("");
          setInputedImage(null);
          setEnterTeamState(false);

          setLoading(false);
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }

  function getTeamGame() {
    setLoading(true);

    const payload: Payload10 = {
      email: props.email,
    };

    dispatch(getTeam(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          setTeam(result.payload.allTeams);
          setInputedTeam("");
          setInputedImage(null);
          setEnterTeamState(false);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }
  // State for the search term

  const [searchTeam, setSearchTeam] = useState("");
  // Filtered leagues based on the search term
  const filteredTeams = team?.filter((individual: any) =>
    individual.team.toLowerCase().startsWith(searchTeam.toLowerCase())
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

  function deleteTeamGame(value: any) {
    console.log(value, "This is the value");
    setLoading(true);
    const payload: Payload11 = {
      id: value._id,
      image: value.image,
      email: props.email,
      team: value.team,
    };

    dispatch(deleteTeam(payload))
      .then(async (result: any) => {
        if (result.payload.success === true) {
          setTeam(result.payload.allTeams);
          setInputedTeam("");
          setInputedImage(null);
          setEnterTeamState(false);
          setLoading(false);
          closeModal();
        }
      })
      .catch((err: any) => {
        displayNotification2();
        setLoading(false);
      });
  }

  function initiateDeleteTeam(value: any) {
    setModalState(true);
    setValue(value);
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
          text={"Are you sure you want to delete this team"}
          value={value}
          value2={value.team}
          handleSubmit={deleteTeamGame}
          loading={loading}
        />
      )}

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
            Select Team
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
              value={searchTeam}
              onChangeText={setSearchTeam}
              onFocus={() => setEnterTeamState(false)}
              placeholderTextColor={Colors.placeHolderTextColor}
              autoCapitalize='none'
              placeholder='Search team'
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
            onPress={() => changeEnterTeamState()}
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
              Add Team
            </Text>
          </TouchableOpacity>
          {enterTeamState && (
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
                  value={inputedTeam}
                  onChangeText={setInputedTeam}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='Enter Team'
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
                onPress={handleSubmitTeam}
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
                  Create Team
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
              TEAMS
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
              {filteredTeams.length > 0 ? (
                filteredTeams.map((individual: any, index: any) => (
                  <Teams
                    key={individual?.id || index}
                    Colors={Colors}
                    individual={individual}
                    initiateDeleteTeam={initiateDeleteTeam}
                    handleSubmit={props.handleSubmit}
                  />
                ))
              ) : team.length > 0 ? (
                team.map((individual: any, index: any) => (
                  <Teams
                    key={individual?.id || index}
                    Colors={Colors}
                    individual={individual}
                    initiateDeleteTeam={initiateDeleteTeam}
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
                  Saved teams shows up here
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

function Teams({Colors, individual, initiateDeleteTeam, handleSubmit}: any) {
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
            {individual.team}
          </Text>
        </View>

        <TouchableOpacity
          // onPress={() => closeNotice()}
          style={{padding: 10}}
          onPress={() => initiateDeleteTeam(individual)}
        >
          <AntDesign name='delete' size={20} color={Colors.welcomeText} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
