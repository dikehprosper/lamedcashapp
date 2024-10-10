/* eslint-disable @typescript-eslint/no-explicit-any */
// useNotification.js
import { useState } from "react";
import * as Haptics from "expo-haptics";

const useNotification = () => {
    const [show2, setShow2] = useState(1);
    const [color, setColor] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [notification, setNotification] = useState({ text: "", icon: null });

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const displayNotificationIn = (
        text: any,
        icon: any,
        duration: any,
        color: any,
        backgroundColor: any,
    ) => {
        setNotification({ text, icon });
        setShow2(0);
        setColor(color);
        setBackgroundColor(backgroundColor);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow2(1);
        }, duration);
    };

    return {
        show2,
        notification,
        displayNotificationIn,
        color,
        backgroundColor,
    };
};

export default useNotification;
