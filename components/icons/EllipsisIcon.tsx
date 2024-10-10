/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Path, Svg } from "react-native-svg";

const EllipsisIcon = ({ color }: { color?: string }) => {
    return (
        <Svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z"
                fill="#ffffff"
            />
            <Path
                d="M12 6.75C12.9665 6.75 13.75 5.9665 13.75 5C13.75 4.0335 12.9665 3.25 12 3.25C11.0335 3.25 10.25 4.0335 10.25 5C10.25 5.9665 11.0335 6.75 12 6.75Z"
                fill="#ffffff"
            />
            <Path
                d="M12 20.75C12.9665 20.75 13.75 19.9665 13.75 19C13.75 18.0335 12.9665 17.25 12 17.25C11.0335 17.25 10.25 18.0335 10.25 19C10.25 19.9665 11.0335 20.75 12 20.75Z"
                fill="#ffffff"
            />
        </Svg>
    );
};

export default EllipsisIcon;
