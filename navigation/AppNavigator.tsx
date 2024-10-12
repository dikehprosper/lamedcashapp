/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Home from "../screens/home";
import Deposit from "../screens/deposit";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome6,
    AntDesign,
    MaterialIcons,
} from "@expo/vector-icons";
import Profile from "@/screens/profile";
import Referral from "@/screens/referral";
import Login from "@/screens/login";
import Signup from "@/screens/signup";
import SecondWelcomePage from "@/screens/secondWelcomePage";
import ThirdWelcomePage from "@/screens/thirdWelcomePage";
import Community from "@/screens/(community)/community";
import Withdraw from "../screens/Withdraw";
import EditProfile from "@/screens/(profileSettings)/(editProfile)/editProfile";
import UpdateProfile from "@/screens/(profileSettings)/(editProfile)/updateProfile";
import EditSettings from "@/screens/(profileSettings)/(settings)/editSettings";
import Wallet from "@/screens/(wallet)/wallet";
import { Color } from "@/constants/Colors";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "@/screens/(community)/ProfileScreen";
import { View, useWindowDimensions } from "react-native";
import AuthScreen from "@/screens/authScreen";
import AccountSecurity from "@/screens/(profileSettings)/(settings)/accountSecurity";
import AccountDeletion from "@/screens/(profileSettings)/(settings)/accountDeletion";
import ChangePassword from "@/screens/(profileSettings)/(settings)/changePassword";
import HelpScreen from "@/screens/(profileSettings)/helpAndSupport";
import Legal from "@/screens/(legal)/legal";
import PrivacyPolicy from "@/screens/(legal)/privacyPolicy";
import TermsAndCondition from "@/screens/(legal)/termsAndCondition";
import WalletHistory from "@/screens/(wallet)/walletHistory";
import WalletHistorySpecific from "@/screens/(wallet)/walletHistorySpecific";
import SendingPage from "@/screens/(wallet)/sendingPage";
import SearchSendingPage from "@/screens/(wallet)/searchSendingPage";
import setAuthScreen from "@/screens/setAuthScreen";
import SetAuthScreen1 from "@/screens/SetAuthScreen1";
import SetTag from "@/screens/(profileSettings)/(editProfile)/setTag";
import ShareDeposit from "@/screens/shareDeposit";
import ResetPassword from "@/screens/resetPassword";
// import Sports from "@/screens/sports";
import Transactions from "@/screens/(transactions)/transactions";
import TransactionHistorySpecific from "@/screens/(transactions)/transactionHistorySpecific";
import DepositReceipt from "@/screens/(individualReceipt)/depositReceipt";
import AddPostScreen from "@/screens/(community)/addPostScreen";
import ChangePin from "@/screens/(profileSettings)/(settings)/changePin";
import SetAuthScreen3 from "@/screens/(profileSettings)/(settings)/(resetPinSection)/setAuthScreen3";
import SetAuthScreen4 from "@/screens/(profileSettings)/(settings)/(resetPinSection)/setAuthScreen4";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import DepositFromWallet from "@/screens/depositFromWallet";
import WithdrawFromWallet from "@/screens/withdrawFromWallet";
import WithdrawalReceipt from "@/screens/(individualReceipt)/withdrawalReceipt";
import SentReceipt from "@/screens/(individualReceipt)/sentReceipt";
import BonusReceiveReceipt from "@/screens/(individualReceipt)/bonusReceiveReceipt";
import ReceiveReceipt from "@/screens/(individualReceipt)/receiveReceipt";
import DepositFeexpay from "@/screens/(wallet)/depositFeexpay";
import { Language } from "@/constants/languages";
import ChangeLanguage from "@/screens/changeLanguageScreen";
import CustomCommunityDrawer from "@/components/customCommunityDrawer";
import DisplayData from "@/components/DisplayData";
import LeaguePage from "@/screens/LeaguePage";
import FixturesDay from "@/screens/FixturesDay";
import { ModalProvider } from "@/components/modalContext";
import WalletRules from "@/screens/(wallet)/walletRules";
import PostDetailScreen from "@/screens/(community)/PostDetailScreen";
import NotificationsScreen from "@/screens/(community)/NotificationScreen";
import EditPost from "@/screens/(community)/EditPost";
import PostDetailScreen2 from "@/screens/(community)/PostDetailScreen2";
import AllNotification from "@/screens/Notification";
import * as Linking from "expo-linking";
import ChangePin2 from "@/screens/(profileSettings)/(settings)/changePin2";
import ChangePassword2 from "@/screens/(profileSettings)/(settings)/changePassword2";
const prefix = Linking.createURL("/");

// import AsyncStorage from "@react-native-async-storage/async-storage";

// import jwtDecode from "jwt-decode"
// const tokenVlaue = "especeproject";
// import Appss from "@/screens/webView";

const Drawer = createDrawerNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    );
}

function WalletNavigator() {
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
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
            <Stack.Screen name="wallet" component={Wallet} />
            <Stack.Screen
                name="walletHistory"
                component={WalletHistory}
                options={({ navigation }) => ({
                    headerShown: true,
                    presentation: "modal",
                    title: languageText.text92,
                    headerLeft: () => (
                        <Ionicons
                            name="chevron-back-outline"
                            size={26}
                            color={Colors.welcomeText}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: Colors.background,
                        borderBottomWidth: 5,
                        color: Colors.welcomeText,
                    },
                    headerTintColor: Colors.welcomeText,
                })}
            />
            <Stack.Screen
                name="walletHistorySpecific"
                component={WalletHistorySpecific}
                options={({ navigation }) => ({
                    headerShown: true,
                    presentation: "modal",
                    title: languageText.text65,
                    //"Details"
                    headerLeft: () => (
                        <Ionicons
                            name="chevron-back-outline"
                            size={26}
                            color={Colors.welcomeText}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: Colors.background,
                        borderBottomWidth: 5,
                        color: Colors.welcomeText,
                    },
                    headerTintColor: Colors.welcomeText,
                })}
            />
            <Stack.Screen
                name="searchSendingPage"
                component={SearchSendingPage}
            />
            <Stack.Screen name="sendingPage" component={SendingPage} />
        </Stack.Navigator>
    );
}

function CommunityNavigator() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const dimensions = useWindowDimensions();
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                backBehavior="history"
                drawerContent={() => <CustomCommunityDrawer />}
                screenOptions={{
                    headerTintColor: Colors.welcomeText,

                    drawerActiveTintColor: Colors.activeTabbarIcons,
                    drawerInactiveTintColor: Colors.tabbarLabelColor,
                    drawerType: dimensions.width >= 768 ? "permanent" : "front",
                    drawerStyle: {
                        backgroundColor: Colors.background,
                        width: "80%",
                    },
                }}
            >
                <Drawer.Screen
                    name="Explore"
                    component={Community}
                    options={{ headerShown: false }}
                />

                <Drawer.Screen
                    name="CommunityProfile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />

                <Drawer.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Post"
                    component={PostDetailScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                <Drawer.Screen
                    name="AddPostScreen"
                    component={AddPostScreen}
                    options={{ headerShown: false }}
                />

                <Drawer.Screen
                    name="EditPost"
                    component={EditPost}
                    options={{ headerShown: false }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

function MainNavigator() {
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

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: false,

                tabBarStyle: {
                    backgroundColor: Colors.tabbarIcons,
                    borderTopColor: "rgba(128, 128, 128, 0.3)",
                },

                tabBarActiveTintColor: Colors.activeTabbarIcons,
                tabBarInactiveTintColor: Colors.tabbarLabelColor,
                tabBarLabelStyle: {
                    fontFamily: "mon-sb",
                    fontWeight: "bold",
                    paddingBottom: 5,
                },

                tabBarIcon: ({ color }: any) => {
                    if (route.name === languageText.text164) {
                        return (
                            <FontAwesome5 name="home" color={color} size={22} />
                        );
                    } else if (route.name === languageText.text116) {
                        return (
                            <Ionicons
                                name="person-circle-sharp"
                                size={25}
                                color={color}
                            />
                        );
                    } else if (route.name === languageText.text165) {
                        return (
                            <MaterialCommunityIcons
                                name="post"
                                size={23}
                                color={color}
                            />
                        );
                    } else if (route.name === languageText.text87) {
                        return (
                            <AntDesign name="wallet" size={23} color={color} />
                        );
                    } else if (route.name === "Sports") {
                        return (
                            <MaterialIcons
                                name="scoreboard"
                                size={24}
                                color={color}
                            />
                        );
                    } else if (route.name === "Referral") {
                        return (
                            <FontAwesome6
                                name="money-bill-transfer"
                                size={20}
                                color={color}
                            />
                        );
                    }
                },
            })}
        >
            <Tabs.Screen
                name={languageText.text164}
                component={HomeNavigator}
            />
            <Tabs.Screen
                name={languageText.text165}
                component={CommunityNavigator}
            />
            <Tabs.Screen
                name={languageText.text87}
                component={WalletNavigator}
            />

            {/* <Tabs.Screen name="Sports" component={Sports} /> */}
            <Tabs.Screen
                name={languageText.text116}
                component={ProfileNavigator}
            />
        </Tabs.Navigator>
    );
}

const AppNavigator = () => {
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

    const Stack = createNativeStackNavigator();

    const linking = { 
        prefixes: [prefix, "https://betfundr.com"],
        config: {
            screens: {
                Home: "home",
                Profile: "profile/:id", // Example with dynamic route
            },
        },
    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <ModalProvider>
                <NavigationContainer linking={linking}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                    >
                        <Stack.Screen
                            name="secondWelcomePage"
                            component={SecondWelcomePage}
                        />
                        <Stack.Screen
                            name="MainNavigator"
                            component={MainNavigator}
                        />
                        <Stack.Screen
                            name="setAuthScreen"
                            component={setAuthScreen}
                        />
                        <Stack.Screen
                            name="setAuthScreen1"
                            component={SetAuthScreen1}
                        />
                        <Stack.Screen
                            name="accountSecurity"
                            component={AccountSecurity}
                        />
                        <Stack.Screen
                            name="accountDeletion"
                            component={AccountDeletion}
                        />
                        <Stack.Screen
                            name="depositFromWallet"
                            component={DepositFromWallet}
                        />
                        <Stack.Screen
                            name="withdrawFromWallet"
                            component={WithdrawFromWallet}
                        />
                        <Stack.Screen name="withdraw" component={Withdraw} />
                        <Stack.Screen
                            name="shareDeposit"
                            component={ShareDeposit}
                        />
                        <Stack.Screen
                            name="depositFeexpay"
                            component={DepositFeexpay}
                            options={({ navigation }) => ({
                                headerShown: true,

                                title: "Web Page",
                                headerLeft: () => (
                                    <Ionicons
                                        name="chevron-back-outline"
                                        size={26}
                                        color={Colors.welcomeText}
                                        onPress={() => navigation.goBack()}
                                    />
                                ),
                                headerStyle: {
                                    backgroundColor: Colors.background,
                                    borderBottomWidth: 0,
                                    color: Colors.welcomeText,
                                },
                                headerTintColor: Colors.welcomeText,
                            })}
                        />
                        <Stack.Screen
                            name="DisplayData"
                            component={DisplayData}
                        />
                        <Stack.Screen
                            name="LeaguePage"
                            component={LeaguePage}
                        />
                        <Stack.Screen
                            name="FixturesDay"
                            component={FixturesDay}
                        />
                        <Stack.Screen name="deposit" component={Deposit} />
                        <Stack.Screen
                            name="transactions"
                            component={Transactions}
                        />
                        <Stack.Screen
                            name="editProfile"
                            component={EditProfile}
                        />
                        <Stack.Screen
                            name="updateProfile"
                            component={UpdateProfile}
                        />
                        <Stack.Screen name="setTag" component={SetTag} />
                        <Stack.Screen
                            name="editSettings"
                            component={EditSettings}
                        />
                        <Stack.Screen
                            name="changeLanguageScreen"
                            component={ChangeLanguage}
                        />
                        <Stack.Screen
                            name="changePassword"
                            component={ChangePassword}
                        />
                        <Stack.Screen
                            name="changePassword2"
                            component={ChangePassword2}
                        />
                        <Stack.Screen
                            name="receiveReceipt"
                            component={ReceiveReceipt}
                        />
                        <Stack.Screen
                            name="bonusReceiveReceipt"
                            component={BonusReceiveReceipt}
                        />
                        <Stack.Screen
                            name="withdrawalReceipt"
                            component={WithdrawalReceipt}
                        />
                        <Stack.Screen
                            name="sentReceipt"
                            component={SentReceipt}
                        />
                        <Stack.Screen
                            name="depositReceipt"
                            component={DepositReceipt}
                        />
                        <Stack.Screen name="changePin" component={ChangePin} />
                        <Stack.Screen
                            name="changePin2"
                            component={ChangePin2}
                        />
                        <Stack.Screen
                            name="SetAuthScreen3"
                            component={SetAuthScreen3}
                        />
                        <Stack.Screen
                            name="SetAuthScreen4"
                            component={SetAuthScreen4}
                        />
                        <Stack.Screen
                            name="helpScreen"
                            component={HelpScreen}
                        />
                        <Stack.Screen
                            name="Post2"
                            component={PostDetailScreen2}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="transactionHistorySpecific"
                            component={TransactionHistorySpecific}
                        />
                        <Stack.Screen name="legal" component={Legal} />
                        <Stack.Screen
                            name="privacyPolicy"
                            component={PrivacyPolicy}
                        />
                        <Stack.Screen
                            name="termsAndCondition"
                            component={TermsAndCondition}
                        />
                        <Stack.Screen
                            name="Notification"
                            component={AllNotification}
                        />

                        <Stack.Screen name="referral" component={Referral} />
                        <Stack.Screen
                            name="thirdWelcomePage"
                            component={ThirdWelcomePage}
                        />
                        <Stack.Screen name="signup" component={Signup} />
                        <Stack.Screen
                            name="authScreen"
                            component={AuthScreen}
                        />
                        <Stack.Screen
                            name="Post"
                            component={PostDetailScreen}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen
                            name="walletRules"
                            component={WalletRules}
                        />
                        <Stack.Screen
                            name="resetPassword"
                            component={ResetPassword}
                        />
                        <Stack.Screen
                            name="walletHistorySpecific"
                            component={WalletHistorySpecific}
                            options={({ navigation }) => ({
                                headerShown: true,
                                presentation: "modal",
                                title: languageText.text65,
                                //"Details"
                                headerLeft: () => (
                                    <Ionicons
                                        name="chevron-back-outline"
                                        size={26}
                                        color={Colors.welcomeText}
                                        onPress={() => navigation.goBack()}
                                    />
                                ),
                                headerStyle: {
                                    backgroundColor: Colors.background,
                                    borderBottomWidth: 5,
                                    color: Colors.welcomeText,
                                },
                                headerTintColor: Colors.welcomeText,
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ModalProvider>
        </View>
    );
};

export default AppNavigator;
