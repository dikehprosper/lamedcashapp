declare module "react-native-modern-datepicker" {
    import { Component } from "react";
    import { ViewStyle, TextStyle } from "react-native";

    interface DatePickerProps {
        mode?: "date" | "time" | "monthYear" | "year";
        current?: string;
        selected?: string;
        minimumDate?: string;
        maximumDate?: string;
        onDateChange?: (date: string) => void;
        onSelectedChange?: (date: string) => void;
        options?: {
            backgroundColor?: string;
            textHeaderColor?: string;
            textDefaultColor?: string;
            selectedTextColor?: string;
            mainColor?: string;
            textSecondaryColor?: string;
            borderColor?: string;
        
        };
        style?: ViewStyle;
        textStyle?: TextStyle;
        isGregorian?: boolean;
        disableDateChange?: boolean;
        selectorStartingYear?: number;
        selectorEndingYear?: number;
        markText?: string;
        startYear?: number;
        endYear?: number;
        locale?: string;
    }

    class DatePicker extends Component<DatePickerProps> {}
    class TimePicker extends Component<DatePickerProps> {}
    // class MonthYearPicker extends Component<DatePickerProps> {}

    export default DatePicker;
}
