/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FontAwesome6, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import PopInAnimation from "./AnimatedContent";
const allNetwork = ["mtn", "glo", "moov"];
const NetworkModalPage = ({
  changeNetworkModal,
  runNetworkCheck,
  currentNetwork,
  closeNetworkModal,
  networkModal,
  network,
  closeNetworkModal2,
  proceedWithNetworkModal,
 proceedWithNetworkModal2
}: any) => {
  //   let networkModal = "third" || "second" || "first";
  //   networkModal = "third";
  //   let network = ["MOOV", "MTN"] || ["MOOV"] || [];
  //   network = ["MOOV", "MTN"];
  useEffect(() => {
    console.log(currentNetwork);
    if (currentNetwork === undefined) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentNetwork]);

  const [disabled, setDisabled] = useState<boolean>();
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000000000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 38,
      }}
    >
      <PopInAnimation
        // startPositionY={0}
        // startPositionX={-200}
        // positionAnimationSpeed={700}
        scaleSpeed={0.9}
        opacitySpeed={200}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          backgroundColor: "white",
          position: "relative",
          borderRadius: 13,
          padding: 20,
          height: 380,
        }}
      >
        <TouchableOpacity
          onPress={network.length === 1 ? closeNetworkModal2: closeNetworkModal}
          style={{
            position: "absolute",
            top: -44,
            right: -5,
          }}
        >
          <Text
            style={{
              fontWeight: "400",
              color: "white",
              fontSize: 26,
            }}
          >
            X
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            flex: 1,
            gap: 30,
            height: "20%",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flex: 1.5,
              gap: 6,
              width: "100%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "800",
                color:
                  networkModal === "first"
                    ? "rgba(220, 0, 0, .9)"
                    : "rgba(73, 166, 106, 1)",
              }}
            >
              {networkModal === "first" &&
                "Sorry we could not detect your network!"}
              {networkModal === "second" &&
                `We detected ${network[0]} as your network!`}
              {networkModal === "third" && "We detected multiple networks!"}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: "rgba(120, 120, 120, 1)",
              }}
            >
              {networkModal === "third" && "Select your network below!"}
              {networkModal === "second" && "Click proceed to continue!"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              width: 65,
              height: 65,
              backgroundColor:
                networkModal === "first"
                  ? "rgba(220, 0, 0, .2)"
                  : "rgba(73, 166, 106, .3)",
              borderRadius: 31,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {networkModal === "third" && (
              <FontAwesome6
                name='network-wired'
                size={31}
                color='rgba(73, 166, 106, 1)'
              />
            )}
            {networkModal === "second" && (
              <FontAwesome6
                name='network-wired'
                size={31}
                color='rgba(73, 166, 106, 1)'
              />
            )}
            {networkModal === "first" && (
              <MaterialCommunityIcons
                name='close-network-outline'
                size={31}
                color=' rgba(220, 0, 0, .9)'
              />
            )}
          </View>
        </View>

        {networkModal === "first" && (
          <View
            style={{
              flex: 4,
              display: "flex",
              height: "80%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flex: 4,
              }}
            >
              <MaterialCommunityIcons
                name='close-network-outline'
                size={80}
                color='rgba(220, 0, 0, .9)'
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: 80,
                alignItems: "center",
                gap: 10,
                flex: 1.7,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 7,
                  backgroundColor: "rgba(128, 128, 128, 0.3)",
                }}
                onPress={closeNetworkModal}
              >
                <Text style={{fontWeight: "600", fontSize: 15}}>
                  {networkModal === "first" && "Cancel"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {networkModal === "second" && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              flex: 4,
            }}
          >
            <View
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
              }}
            >
              <PopInAnimation scaleSpeed={0.6} opacitySpeed={800}>
                <Text
                  style={{
                    fontSize: 50,
                    color: "rgba(73, 166, 106, 1)",
                    fontFamily: "new-mon-i",
                    padding: 8,
                    backgroundColor: "rgba(73, 166, 106, 0.25)",
                  }}
                >
                  {network[0]}!
                </Text>
              </PopInAnimation>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flex: 1.7,
                alignItems: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  backgroundColor: "rgba(73, 166, 106, 1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
                onPress={() => proceedWithNetworkModal2(network)}
              >
                <Text style={{fontWeight: "700", fontSize: 18, color: "white"}}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {networkModal === "third" && (
          <View
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: 40,
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {network.map((data: any, index: any) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        borderRadius: 7,
                        backgroundColor: "",
                      }}
                      onPress={() => runNetworkCheck(data)}
                    >
                      <Text
                        style={{
                          fontWeight: "900",
                          fontSize: 19,
                          color:
                            data === currentNetwork
                              ? "rgba(73, 166, 106, 1)"
                              : "black",
                          borderBottomWidth: data === currentNetwork ? 3 : 0,
                          borderColor: "rgba(73, 166, 106, 1)",
                        }}
                      >
                        {data}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {currentNetwork && (
                <View
                  style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <PopInAnimation scaleSpeed={0.6} opacitySpeed={800}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: "rgba(73, 166, 106, 1)",
                        fontFamily: "new-mon-i",
                        padding: 3,
                        backgroundColor: "rgba(73, 166, 106, 0.25)",
                      }}
                    >
                      {`${currentNetwork}!`}
                    </Text>
                  </PopInAnimation>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1.7,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  backgroundColor: disabled
                    ? "rgba(73, 166, 106, 0.5)"
                    : "rgba(73, 166, 106, 1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
                disabled={disabled}
                onPress={proceedWithNetworkModal}
              >
                <Text style={{fontWeight: "700", fontSize: 18, color: "white"}}>
                  Proceed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
                onPress={closeNetworkModal}
              >
                <Text style={{fontWeight: "600", fontSize: 15}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </PopInAnimation>
    </View>
  );
};

export default NetworkModalPage;

  
