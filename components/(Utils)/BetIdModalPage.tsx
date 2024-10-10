/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import React, {useState, useEffect, useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
TextInput,
Pressable

} from "react-native";
import PopInAnimation from "./AnimatedContent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";

const BetIdModalPage = ({closeBetIdModal, chooseBetId, betId}: any) => {
  const data = useSelector((state: RootState) => state.getUserData.data);
  const isLoading = useSelector(
    (state: RootState) => state.getUserData.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();

  //   useEffect(() => {
  //     console.log(currentNetwork);
  //     if (currentNetwork === undefined) {
  //       setDisabled(true);
  //     } else {
  //       setDisabled(false);
  //     }
  //   }, [currentNetwork]);

  const [disabled, setDisabled] = useState<boolean>();
  const [searchBetID, setSearchBetId] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(null);


  const handleSearchInputChange = (text: any) => {
    setSearchBetId(text);
    filterData(text);
  };

  // Function to filter data based on search query
  const filterData = (query: any) => {
    const filtered = data.supplementaryBetId.filter((data2: any) => {
      // Convert data2 to string if it's not already a string
      const dataString = typeof data2 === "string" ? data2 : String(data2);
      // Perform inclusion check on the string representation of data2
      return dataString.startsWith(query);
    });
    setFilteredData(filtered);
  };

  const modalRef = useRef(null);

  const handleClickOutside = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;
    const isInModal =
      locationX > 0 &&
      locationX < event.currentTarget.offsetWidth &&
      locationY > 0 &&
      locationY < event.currentTarget.offsetHeight;

    if (!isInModal) {
      closeBetIdModal();
    }
  };

    useEffect(() => {
      console.log(filteredData);
    });

    function chooseBetId2(value: any) {
      console.log(value, "wufybjwdbibdjivbdibvidc");
    }

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000000000,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Pressable
        style={{
          flex: 1,
          padding: 10,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={handleClickOutside}
      >
        <PopInAnimation
          ref={modalRef}
          startPositionY={-200}
          // startPositionX={-200}
          // positionAnimationSpeed={700}
          scaleSpeed={0.9}
          opacitySpeed={200}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "93%",
            backgroundColor: "white",
            position: "relative",
            borderRadius: 13,
            height: 380,
          }}
        >
          <View
            style={{
              display: "flex",
              height: 55,
              gap: 15,
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              borderBottomWidth: 1.5,
              borderBottomColor: "rgba(0, 0, 0, 0.3)",
              paddingLeft: 12,
            }}
          >
            <TouchableOpacity onPress={closeBetIdModal}>
              <MaterialIcons
                name='arrow-back-ios-new'
                size={20}
                color='rgba(0, 0, 0, 0.7)'
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            >
              Choisissez parmi un BetId précédent
            </Text>
          </View>
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 13,
              backgroundColor: "transparent",
              borderRadius: 8,
              borderColor: "rgba(0, 0, 0, 0.6)",
              borderWidth: 1.5,
              position: "relative",
              borderBottomWidth: 1.5,
            }}
          >
            <Text style={{paddingLeft: 12, paddingRight: 2, opacity: 1}}>
              <FontAwesome5
                name='search'
                size={15}
                color='rgba(0, 0, 0, 0.6)'
              />
            </Text>
            <TextInput
              value={searchBetID}
              onChangeText={handleSearchInputChange}
              placeholderTextColor='grey'
              autoCapitalize='none'
              placeholder='Search BetId'
              autoCorrect={false}
              style={{
                backgroundColor: "transparent",
                width: "80%",
                height: 44,
                paddingLeft: 10,
                fontWeight: "400",
              }}
              onEndEditing={handleSearchInputChange}
            ></TextInput>
          </View> */}
          <View style={{flex: 6, width: "100%"}}>
            <ScrollView
              scrollEnabled={true}
              alwaysBounceVertical={true}
              style={styles.betids}
            >
              {filteredData !== null
                ? 
                null
                // filteredData.map((data2: any, index: any) => {
                //     return (
                //       <TouchableOpacity
                //         onPress={() => chooseBetId(data2)}
                //         key={index}
                //         style={{
                //           paddingVertical: 15,
                //           paddingHorizontal: 20,
                //           borderBottomWidth: 1.5,
                //           borderBottomColor: "rgba(0, 0, 0, 0.1)",
                //           flexDirection: "row",
                //           justifyContent: "space-between",
                //         }}
                //       >
                //         <Text
                //           style={{
                //             fontWeight: "800",
                //             fontSize: 16,
                //             color: "rgba(0, 0, 0, 0.6)",
                //           }}
                //         >
                //           {data2}
                //         </Text>
                //         {data2 === betId ? (
                //           <View
                //             style={{
                //               backgroundColor: "green",
                //               borderRadius: 18,
                //               width: 18,
                //               height: 18,
                //             }}
                //           >
                //             <MaterialIcons
                //               name='check'
                //               size={16}
                //               color='white'
                //             />
                //           </View>
                //         ) : (
                //           <View
                //             style={{
                //               borderRadius: 18,
                //               width: 18,
                //               height: 18,
                //               borderColor: "rgba(0, 0, 0, 0.6)",
                //               borderWidth: 1.3,
                //             }}
                //           >
                //             {/* <MaterialIcons name='check' size={18} color='white' /> */}
                //           </View>
                //         )}
                //       </TouchableOpacity>
                //     );
                //   })
                : data?.supplementaryBetId.map(
                    (
                      data2:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <TouchableOpacity
                          onPress={() => chooseBetId(data2)}
                          key={index}
                          style={{
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                            borderBottomWidth: 1.5,
                            borderBottomColor: "rgba(0, 0, 0, 0.1)",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "800",
                              fontSize: 16,
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            {/* {betID && data2.contain(betID)} */}
                            {data2}
                          </Text>
                          {data2 === betId ? (
                            <View
                              style={{
                                backgroundColor: "green",
                                borderRadius: 18,
                                width: 18,
                                height: 18,
                              }}
                            >
                              <MaterialIcons
                                name='check'
                                size={16}
                                color='white'
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                borderRadius: 18,
                                width: 18,
                                height: 18,
                                borderColor: "rgba(0, 0, 0, 0.6)",
                                borderWidth: 1.3,
                              }}
                            >
                              {/* <MaterialIcons name='check' size={18} color='white' /> */}
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    }
                  )}
            </ScrollView>
          </View>
        </PopInAnimation>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  betids: {
    display: "flex",
    flex: 1,
  },
});
export default BetIdModalPage;
