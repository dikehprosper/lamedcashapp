/* eslint-disable react/react-in-jsx-scope */
import { Path, Svg } from "react-native-svg";

const LeftArrowIcon = ({ color }: { color?: string }) => {
    return (
        <Svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <Path
                d="M4 12H20M4 12L8 8M4 12L8 16"
                stroke={color ? color : "#ffffff"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default LeftArrowIcon;
