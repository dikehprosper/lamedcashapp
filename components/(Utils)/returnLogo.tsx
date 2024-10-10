/* eslint-disable react/react-in-jsx-scope */

import { Image } from "react-native";
import image from "../../assets/images/1xbet-logo.png";

function ReturnLogo(value: { value: string }) {
    console.log(value);
    if (value.value === "1xbet") {
        return (
            <Image
                source={image}
                style={{ height: 25, width: 60, objectFit: "contain" }}
            />
        );
    }
}

export default ReturnLogo;
