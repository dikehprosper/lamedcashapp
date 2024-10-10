/* eslint-disable react/react-in-jsx-scope */
import { Svg, Path } from "react-native-svg";

const UpArrowIcon = ({ color }: { color?: string }) => {
    return (
        <Svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 4V20M12 4L8 8M12 4L16 8"
                stroke={color ? color : "#ffffff"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default UpArrowIcon;
