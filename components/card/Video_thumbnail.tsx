/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function VideoThumbnail({ url }: { url: string }) {
    const [thumbnail, setThumbnail] = useState("");
    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
                time: 3,
            });
            setThumbnail(uri);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        generateThumbnail();
    }, []);

    return (
        <View style={{ justifyContent: "center" }}>
            <View
                style={{
                    position: "absolute",
                    zIndex: 90,
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    borderRadius: 90,
                    opacity: 0.7,
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <Ionicons
                    name="play"
                    color={"white"}
                    style={{ opacity: 40 }}
                    size={40}
                />
            </View>
            <Image
                source={{ uri: thumbnail }}
                style={{
                    height: 300,
                    borderRadius: 10,
                }}
            />
        </View>
    );
}
