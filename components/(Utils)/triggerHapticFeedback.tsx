import * as Haptics from "expo-haptics";

export default function triggerHapticFeedback() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}
