/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Modal,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";

interface MediaModalProps {
    imageModal: boolean;
    setImageModal: (visible: boolean) => void;
    post: {
        media?: {
            type: "image" | "video";
            url: string;
        }[];
    };
    Colors: any;
    index: number;
}

export default function MediaModal({
    imageModal,
    setImageModal,
    post,
    Colors,
    index,
}: MediaModalProps) {
    const layout = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);
    const [scrollViewWidth, setScrollViewWidth] = useState(layout.width);
    const [visibleItem, setVisibleItem] = useState<number>(index);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const itemWidth = layout.width; // Item width
        const startVisibleIndex = Math.floor(scrollX / itemWidth);
        setVisibleItem(startVisibleIndex);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: index * scrollViewWidth,
                animated: true,
            });
        }
    }, [index, scrollViewWidth]);

    return (
        <Modal visible={imageModal} animationType="slide">
            <View
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => setImageModal(false)}
                    style={{
                        position: "absolute",
                        zIndex: 90,
                        top: 50,
                        right: 20,
                    }}
                >
                    <Ionicons name="close-circle" color="white" size={30} />
                </TouchableOpacity>
                <ScrollView
                    ref={scrollRef}
                    onLayout={(e) => {
                        const width = e.nativeEvent.layout.width;
                        setScrollViewWidth(width);
                        scrollRef.current?.scrollTo({
                            x: index * width,
                            animated: true,
                        });
                    }}
                    onScroll={handleScroll}
                    style={{
                        height: "90%",
                        width: "100%",
                    }}
                    pagingEnabled
                    horizontal
                >
                    {post.media?.map((item, e) => (
                        <View
                            key={e}
                            style={{
                                height: "100%", // Set the height to fill the container
                                width: layout.width, // Ensure full width of the scroll container
                                justifyContent: "center", // Center the content
                                alignItems: "center", // Center the content
                                overflow: "hidden", // Ensure content does not overflow
                            }}
                        >
                            {item.type === "image" ? (
                                <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Video
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    source={{ uri: item.url }}
                                    resizeMode={ResizeMode.CONTAIN} // Ensure video maintains its aspect ratio
                                    useNativeControls
                                    shouldPlay={visibleItem === e} // Autoplay when in view
                                    isLooping
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
}
