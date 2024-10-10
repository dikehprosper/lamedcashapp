/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator, View } from "react-native";

const LoadingCard = () => {
    return (
        <View style={{ padding: 50 }}>
            <ActivityIndicator
                color="#17b978"
                style={{
                    transform: "scale(1.2)",
                }}
            />
        </View>
    );
};

export default LoadingCard;
