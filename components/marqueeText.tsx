// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useEffect, useRef } from "react";
// import {
//     Animated,
//     Text,
//     View,
//     StyleSheet,
//     ViewStyle,
//     TextStyle,
// } from "react-native";

// interface MarqueeTextProps {
//     text: string;
//     textStyle?: TextStyle;
//     containerStyle?: ViewStyle;
// }

// const MarqueeText: React.FC<MarqueeTextProps> = ({
//     text,
//     textStyle,
//     containerStyle,
// }) => {
//     const translateX = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.loop(
//             Animated.sequence([
//                 Animated.timing(translateX, {
//                     toValue: -1000, // Adjust this value based on your text width
//                     duration: 25000, // Duration for the animation
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateX, {
//                     toValue: 0,
//                     duration: 0,
//                     useNativeDriver: true,
//                 }),
//             ]),
//         ).start();
//     }, [translateX]);

//     return (
//         <View style={[styles.container, containerStyle]}>
//             <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text>
//             {/* <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text>
//             <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text> */}
//             {/* <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text>
//             <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text> */}
//             {/* <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text>
//             <Animated.Text
//                 style={[
//                     textStyle,
//                     styles.animatedText,
//                     {
//                         transform: [{ translateX }],
//                     },
//                 ]}
//             >
//                 <Text style={{ opacity: 0.5, fontSize: 16 }}>{text}</Text>
//             </Animated.Text> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         overflow: "hidden",
//         flexDirection: "row",
//         height: 20,
//         gap: 30, // Ensure the texts are aligned horizontally
//     },
//     animatedText: {
//         flexDirection: "row",
//     },
// });

// export default MarqueeText;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Text,
    View,
    StyleSheet,
    ViewStyle,
    TextStyle,
    LayoutChangeEvent,
} from "react-native";

interface MarqueeTextProps {
    text: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
    text,
    textStyle,
    containerStyle,
}) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (textWidth > containerWidth) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: -textWidth, // Adjust based on text width
                        duration: 25000, // Adjust duration as needed
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: containerWidth,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        }
    }, [textWidth, containerWidth, translateX]);

    const onTextLayout = (e: LayoutChangeEvent) => {
        setTextWidth(e.nativeEvent.layout.width);
    };

    const onContainerLayout = (e: LayoutChangeEvent) => {
        setContainerWidth(e.nativeEvent.layout.width);
    };

    return (
        <View
            style={[styles.container, containerStyle]}
            onLayout={onContainerLayout}
        >
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
                <Text
                    onLayout={onTextLayout}
                    style={[
                        textStyle,
                        {
                            flexDirection: "row",
                            opacity: 0.5,
                            fontSize: 15,
                            marginRight: 60,
                        },
                    ]}
                >
                    {text}
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flexDirection: "row",
    },
    animatedContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 7000,
    },
});

export default MarqueeText;
