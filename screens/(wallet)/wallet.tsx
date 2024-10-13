/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomCircle from "@/components/walletCustomCircle";
import React, { useContext, useEffect, useState } from "react";
import {
    StatusBar,
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5, Feather, FontAwesome } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import formatDate from "@/components/(Utils)/formatDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatNumberWithCommasAndDecimal, {
    formatNumber,
} from "@/components/(Utils)/formatNumber";
import formatTime from "@/components/(Utils)/formatTime";
import TruncatedText from "@/components/(Utils)/truncateText";
const screenHeight = Dimensions.get("window").height;
// Calculate the percentage value
const percentageHeight = screenHeight * 0.075;
const currency = "XOF";
import BonusListTransaction from "@/components/(receipt)/bonusListTransaction";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Language } from "@/constants/languages";
import ExploreHeader3 from "@/components/ExploreHeader3";
import ModalContext from "@/components/modalContext";
import WalletModal1 from "@/components/(modals)/walletModal1";
import WalletModal2 from "@/components/(modals)/walletModal2";
import { getModalState, getUser } from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Token {
    token: string;
}
const Wallet = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [count, setCount] = useState(0);
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

    const post = data.transactionHistory?.filter(
        (transaction: any) => "bonusBalance" in transaction,
    );

    const firstThreePosts = post?.reverse().slice(0, 3);


  
     
    useEffect(() => {
        const target = data.bonusBalance;
        const duration = 3000; // Duration in milliseconds
        const increment = Math.ceil(target / (duration / 100)); // Increment every 100 milliseconds

        const interval = setInterval(() => {
            setCount((prevCount) => {
                const newCount = prevCount + increment;
                return newCount >= target ? target : newCount;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        dispatch(getModalState())
            .then(async (result: any) => {
                if (result.payload === null) {
                    showModal(
                        <WalletModal2
                            hideModal={hideModal}
                            navigation={navigation}
                        />,
                    );
                }
              
            })
            .catch((err: any) => console.log(err));
    }, []);

    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error("HomeScreen must be used within a ModalProvider");
    }
    const { showModal, hideModal } = modalContext;

     const imageSource =
         data.image !== ""
             ? { uri: data.image }
             : {
                   uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
               };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 10,
        }}
      >
        <StatusBar backgroundColor={Colors.background} />
        <ExploreHeader3 />
        <View style={{flex: 1}}>
          <View
            style={[styles.container, {backgroundColor: Colors.background}]}
          >
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image source={imageSource} style={styles.profileImage} />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 18,
                        color: Colors.welcomeText,
                      }}
                    >
                      {languageText.text87}
                    </Text>
                  </View>

                  <View style={{flex: 1, width: "100%"}}>
                    <Text
                      style={{
                        color: Colors.welcomeText,
                        flexWrap: "wrap",
                        width: "90%",
                        height: 40,
                      }}
                    >
                      {languageText.text88}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.overallactionRow_2}>
                {/* <View
                                style={[
                                    styles.actionRow_2,
                                    {
                                        backgroundColor:
                                            Colors.betIdAllBackgroundColor,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        showModal(
                                            <WalletModal1
                                                hideModal={hideModal}
                                                navigation={navigation}
                                            />,
                                        )
                                    }
                                    style={[
                                        styles.actionRow_2_background2,
                                        { borderColor: Colors.welcomeText },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.actionRow_2_text2,
                                            { color: Colors.primary4 },
                                        ]}
                                    >
                                        <MaterialIcons
                                            name="more-vert"
                                            size={24}
                                            color={Colors.primary4}
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
              marginTop: 17,
            }}
          >
            <Text
              style={{
                fontWeight: "200",
                fontSize: 48,
                color: Colors.welcomeText,
              }}
            >
              {currency}
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 48,
                color: Colors.welcomeText,
              }}
            >
              {formatNumber(parseFloat(data.bonusBalance))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              paddingHorizontal: 10,
              marginTop: 19,
            }}
          >
            <Text
              style={{
                fontWeight: "300",
                fontSize: 15,
                marginTop: 5,
                color: Colors.welcomeText,
                textAlign: "center",
              }}
            >
              {
                languageText.text358
                //Wallet balance
              }
            </Text>
          </View>

          <View
            style={{
              height: 70,
              paddingHorizontal: 10,
              gap: 15,
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: "30%",
                height: "100%",
                backgroundColor: "rgba(120, 120, 120, .2)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={() => navigation.push("depositFromWallet")}
            >
              <MaterialCommunityIcons
                name='login'
                size={32}
                color='rgba(40, 40, 256, 0.9)'
              />

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: Colors.welcomeText,
                  marginTop: 7,
                  opacity: 0.7,
                  textAlign: "center",
                }}
              >
                {
                  languageText.text360
                  //Deposit
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: "100%",
                backgroundColor: "rgba(120, 120, 120, .2)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={() => navigation.push("withdrawFromWallet")}
            >
              <MaterialCommunityIcons
                name='logout'
                size={32}
                color='rgba(40, 40, 256, 0.9)'
              />

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: Colors.welcomeText,
                  marginTop: 7,
                  opacity: 0.7,
                }}
              >
                {
                  languageText.text359
                  //Withdraw
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: "100%",
                backgroundColor: "rgba(120, 120, 120, .2)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={() => navigation.push("searchSendingPage")}
            >
              <FontAwesome
                name='send'
                size={27}
                color='rgba(40, 40, 256, 0.9)'
                style={{marginBottom: 5}}
              />

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: Colors.welcomeText,
                  marginTop: 5,
                  opacity: 0.7,
                }}
              >
                {
                  languageText.text90
                  //Send
                }
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.container3, {backgroundColor: Colors.background}]}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={firstThreePosts}
              renderItem={({item}) => (
                <BonusListTransaction
                  specificData={item}
                  navigation={navigation}
                />
              )}
              scrollEnabled={false}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 2,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
              onPress={() => navigation.push("walletHistory")}
            >
              <MaterialIcons
                name='read-more'
                size={24}
                color={Colors.welcomeText}
                opacity={0.6}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {
                  languageText.text91
                  //View history
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: percentageHeight,

        // alignContent: "center",
        // justifyContent: "center"
    },
    container3: {
        paddingHorizontal: 15,
        marginTop: 23,
    },
    transaction_result: {
        gap: 8,
        display: "flex",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 3,
        paddingHorizontal: 15,
    },
    actionRow: {
        flexDirection: "row",
        margin: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    overallactionRow_2: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
    },
    actionRow_2: {
        flexDirection: "row",
        display: "flex",
        width: "auto",
        alignItems: "center",
        textAlign: "auto",
        borderRadius: 4,
        height: 23,
    },
    actionRow_2_background1: {
        display: "flex",
        paddingLeft: 6,
        height: 23,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "center",
        borderTopStartRadius: 4,
        borderBottomLeftRadius: 4,
    },
    actionRow_2_text1: {
        // fontFamily: "mon-b",
        fontWeight: "900",
    },
    actionRow_2_background2: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 15,

        borderWidth: 1.7,
    },
    actionRow_2_text2: {
        alignSelf: "center",
        transform: [{ rotate: "90deg" }],
    },
    imageProfile: {
        width: 84,
        height: 25,
    },
    NotificationBox: {
        padding: 2.5,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 4,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    small_device_group: {
        display: "flex",
        flex: 1,
        gap: 3,
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "red",
        // whiteSpace: 'nowrap'
    },
});

export default Wallet;
