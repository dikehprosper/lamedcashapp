/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import LeagueComponent from "@/components/LeagueComponent";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useRef, useState } from "react";
import DateSlider from "./DateSlider";
import DateModal from "./DateModal";
import Refresh from "./Refresh";
import { Language } from "@/constants/languages";

export default function AllGames({
    navigation,
    Colors,
}: {
    navigation: any;
    Colors: any;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const fixtures = useSelector(
        (state: RootState) => state.fixturesSlice.fixtures,
    );
    const dateFixtures = useSelector(
        (state: RootState) => state.fixturesSlice.dateFixtures,
    );
    const dateFilter = useSelector(
        (state: RootState) => state.fixturesSlice.dateFilter,
    );
    const isLoading = useSelector(
        (state: RootState) => state.fixturesSlice.isLoading,
    );
    const [date, setDate] = useState<any>();
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    function selectedStart(dateStr: any) {
        setDate(dateStr);
    }
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    const dateRefs = useRef<TouchableOpacity[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const layout = useWindowDimensions();
    const todayContentRef = useRef<TouchableOpacity>(null);

    const scrollToTargetContent = (targetContentRef: any) => {
        if (targetContentRef.current && scrollViewRef.current) {
            targetContentRef.current.measureLayout(
                scrollViewRef.current,
                (x: any, y: any, width: any) => {
                    scrollViewRef.current!.scrollTo({
                        x: x - layout.width / 2 + width / 0.53,
                        y: 0,
                        animated: true,
                    });
                },
            );
        } else {
            targetContentRef.measureLayout(
                scrollViewRef.current,
                (x: any, y: any, width: any) => {
                    scrollViewRef.current!.scrollTo({
                        x: x - layout.width / 2 + width / 0.53,
                        y: 0,
                        animated: true,
                    });
                },
            );
        }
    };
    const scrollToTargetContent2 = (date: string, contentRefs: any) => {
        const targetContentRef = contentRefs[date];
        if (
            targetContentRef &&
            targetContentRef.current &&
            scrollViewRef.current
        ) {
            targetContentRef.current.measureLayout(
                scrollViewRef.current,
                (x: any, y: any, width: any) => {
                    scrollViewRef.current!.scrollTo({
                        x: x - layout.width / 2 + width / 2,
                        y: 0,
                        animated: true,
                    });
                },
                (error: any) => console.log("Error measuring layout:", error),
            );
        }
    };

     const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row"}}>
          <Refresh
            scrollToTargetContent={scrollToTargetContent}
            todayContentRef={todayContentRef}
          />
          <DateSlider
            navigation={navigation}
            scrollToTargetContent={scrollToTargetContent}
            scrollViewRef={scrollViewRef}
            todayContentRef={todayContentRef}
            dateRefs={dateRefs}
          />
          <DateModal
            scrollToTargetContent={scrollToTargetContent}
            todayContentRef={todayContentRef}
          />
        </View>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={Colors.default1} />
          </View>
        ) : dateFixtures?.length > 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 200}}
            keyExtractor={(item: any, index) => item.league.id.toString()}
            initialNumToRender={10}
            data={
              dateFixtures?.length === 0 ? fixtures : dateFixtures ?? fixtures
            }
            ItemSeparatorComponent={() => <View style={{height: 25}} />}
            renderItem={({item}) => (
              <LeagueComponent fixture={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: "900"}}>
              {languageText.text357}
            </Text>
          </View>
        )}
      </View>
    );
}
