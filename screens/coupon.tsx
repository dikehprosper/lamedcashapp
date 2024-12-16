/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import {Color} from "@/constants/Colors";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {
  changeColorScheme,
  editProfileImage,
} from "@/state/userData/getUserData";

import * as Haptics from "expo-haptics";
import PickImageComponent from "@/components/pickImageComponent";
import * as Linking from "expo-linking";
import {Alert} from "react-native";

import LoadingComponent from "@/components/loadingComponent";
import ToastNotification from "@/components/(Utils)/toastNotification";
import {CommonActions} from "@react-navigation/native";
import {Language} from "@/constants/languages";
import {lang} from "moment";
import image from "../assets/images/image1_1.png";
import image2 from "../assets/images/image1_2.png";
// import useNotification from "@/components/(Utils)/displayNotification";

interface Payload {
  choosenImage: any;
  email: string;
}
interface payload {
  email: string;
}

interface ItemProps {
  index: number;
  text: string; // Text to be displayed
  text2: string;
  navigation: any;
  colorScheme: number;
  email: string;
  Colors: any;
  languageText: any;
  image: any
}

const Item: React.FC<ItemProps> = ({
  index,
 
  text,
  text2,

  navigation,
  colorScheme,
  email,
  Colors,
  languageText,
  image,
}) => {
  const [isEnabled, setIsEnabled] = useState(colorScheme === 2 ? true : false);

  const logout = () => {
    AsyncStorage.removeItem("token")
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: "login"}],
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const dispatch = useDispatch<AppDispatch>();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    const payload: payload = {
      email: email,
    };
    dispatch(changeColorScheme())
      .then(async (result: any) => {})
      .catch((err: any) => console.log(err));
  };
  const handlePress = () => {
    if (index === 0) {
      navigation.push("firstsection");
    } else if (index === 1) {
      navigation.push("secondsection");
    } else if (index === 2) {
      navigation.push("editSettings");
    } else if (index === 4) {
      navigation.push("changeLanguageScreen");
    } else if (index === 5) {
      navigation.push("helpScreen");
    } else if (index === 6) {
      navigation.push("legal");
    } else if (index === 7) {
      logout();
    }
    // Add additional conditions for other index values if necessary
  };

  return (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
        backgroundColor: Colors.default3,
        borderRadius: 6,
        width: "43%",
      }}
      onPress={handlePress}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 9,
          gap: 15,
        }}
      >
        <View style={{width: "100%"}}>
          <Image source={image} style={{width: 90, height: 90}} />
        </View>
        <View style={{display: "flex", flexDirection: 'column',alignItems: "center", justifyContent: "center", marginTop: 5}}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 15,
              marginBottom: 2,
              color: Colors.welcomeText,
              textAlign: "center",
            }}
          >
            {text}
          </Text>
          <Text
            style={{
              opacity: 0.6,
              color: Colors.welcomeText,
              flexWrap: "wrap",
              width: "95%",
              textAlign: "center",
            }}
          >
            {text2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Coupon = ({navigation}: any) => {
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

  const updatedColorScheme = parseFloat(colorScheme);

  const isLoading = useSelector(
    (state: RootState) => state.getUserData.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const itemsData = [
    {
      text: languageText.text366,
      text2: languageText.text367,
      image: image,
      IconName: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={Colors.default1}
        />
      ),
    },
    {
      text: languageText.text368,
      text2: languageText.text367,
      image: image2,
      IconName: <Ionicons name='people' size={24} color={Colors.default1} />,
    },
  ];

  //  for photo uploads

  const [imageUri, setImageUri] = useState(data.image);
  // const [imageUri2, setImageUri2] = useState(data.image);
  const [imagePickModal, setImagePickModal] = useState(false);

  function openImagepickModal() {
    setImagePickModal(true);
  }

  function closeImagepickModal() {
    setImagePickModal(false);
  }

  const handleImagePicked = async (
    pickerResult: ImagePicker.ImagePickerResult
  ) => {
    if (!pickerResult.canceled) {
      // setImageUri(pickerResult.assets[0].uri);
      setLoading(true);
      const payload: Payload = {
        choosenImage: pickerResult.assets,
        email: data.email,
      };

      dispatch(editProfileImage(payload))
        .then(async (result: any) => {
          if (result.payload.success === true) {
            displayNotification();
            setLoading(false);
          }
          if (result.payload.status === 400) {
            displayNotification1();
            setLoading(false);
          }
          if (result.payload.status === 401) {
            displayNotification2();
            setLoading(false);
          }
          if (result.payload.status === 502) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: "login"}],
              })
            );
            setLoading(false);
          }
          if (result.payload.status === 501) {
            displayNotification3();
            setLoading(false);
          }
          if (result.payload.status === 503) {
            displayNotification3();
            setLoading(false);
          }
        })
        .catch((err: any) => {
          displayNotification3();
          setLoading(false);
        });
    }
  };

  const openSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(
        "Unable to open settings",
        "Please open settings manually and grant permissions."
      );
    });
  };

  const pickImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "This app needs camera roll permissions to work. Please grant the permission in settings.",
        [
          {text: "Cancel", style: "cancel"},
          {text: "Open Settings", onPress: openSettings},
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    handleImagePicked(result);
  };

  const takePhoto = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "This app needs camera permissions to work. Please grant the permission in settings.",
        [
          {text: "Cancel", style: "cancel"},
          {text: "Open Settings", onPress: openSettings},
        ]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    handleImagePicked(result);
  };

  function HandlePress(value: number) {
    closeImagepickModal();
    if (value === 1) {
      takePhoto();
    }
    if (value === 2) {
      pickImage();
    }
    if (value === 3) {
      closeImagepickModal();
    }
  }

  //FOR TOAST NOTIFICATION
  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const text1 = languageText.text146;
  const text2 = languageText.text147;
  const text3 = languageText.text148;
  const text4 = languageText.text149;

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
  function displayNotification1() {
    setShow(2);
    setDisplay(2);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification2() {
    setShow(3);
    setDisplay(3);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }
  function displayNotification3() {
    setShow(4);
    setDisplay(4);
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

  // const {
  //     show2,
  //     notification,
  //     displayNotificationIn,
  //     color,
  //     backgroundColor,
  // } = useNotification();

  // const icon3 = (
  //     <AntDesign name="checkcircleo" size={40} color={Colors.toastText} />
  // );
  // const icon4 = (
  //     <AntDesign
  //         name="exclamationcircleo"
  //         size={40}
  //         color={Colors.toastText}
  //     />
  // );

  // useEffect(() => {
  //     displayNotificationIn("dggdggd", icon3, 3800, "red", "blue");
  // }, []);

  return (
    <View style={{flex: 1}}>
      {imagePickModal && <PickImageComponent onPress={HandlePress} />}
      {loading && <LoadingComponent backgroundColor='transparent' />}
      {/* <ExploreHeader5 /> */}

      {/* <StatusBar backgroundColor={Colors.background} /> */}
      {/* <ToastNotification
                show={show2}
                text={notification.text}
                textColor={color}
                marginTop={Platform.OS === "ios" ? 40 : 0}
                backgroundColor={backgroundColor}
                icon={notification.icon}
            /> */}
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
              ? "red"
              : display === 3
                ? "red"
                : "red"
        }
        icon={
          display === 1
            ? icon1
            : display === 2
              ? icon2
              : display === 3
                ? icon2
                : icon2
        }
      />
      <View style={[styles.container, {backgroundColor: Colors.background}]}>
        <View>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 25,
              marginBottom: 30,
              color: Colors.welcomeText,
            }}
          >
         Coupon
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              gap: 20,
            }}
          >
            {itemsData.map((item, index) => (
              <Item
                key={index}
                index={index}
                text2={item.text2}
                text={item.text}
                navigation={navigation}
                colorScheme={updatedColorScheme}
                email={data.email}
                Colors={Colors}
                languageText={languageText}
                image={item.image}              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    height: 300,
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

export default Coupon;

export function ImageViewer({selectedImage}: any) {
  // const imageSource =
  //   selectedImage === "" ? {uri: s`electedImage} : placeholderImageSource;

  const imageSource =
    selectedImage !== ""
      ? {uri: selectedImage}
      : {
          uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
        };

  // Image.prefetch(imageSource);

  return (
    <View
      style={{
        width: 90,
        height: 90,
        borderRadius: 50,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(120, 120, 120, .2)",
      }}
    >
      <ActivityIndicator />
      <View style={{position: "absolute"}}>
        <Image
          source={imageSource}
          style={{width: 90, height: 90, borderRadius: 50}}
        />
      </View>
    </View>
  );
}
