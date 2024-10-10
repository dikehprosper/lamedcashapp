/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
function isInt(value: any) {
    return (
        !isNaN(value) &&
        (function (x) {
            return (x | 0) === x;
        })(parseFloat(value))
    );
}

type IReturnDateFormat =
    | "full-date"
    | "day"
    | "month"
    | "time"
    | "ddmmyy"
    | "locale-string";

    
export const convertDate = (date: any, returnData: IReturnDateFormat) => {
    let newDate = date;

    if (isInt(date)) {
        var utcSeconds = parseInt(date);
        newDate = new Date(utcSeconds).toISOString();
    }

    const dummyDate = new Date(String(newDate.split("T")[0]));
    var dt = new Date(newDate);
    // var h = dt.getHours(),
    //     m = dt.getMinutes();
    // var _time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        dummyDate
    );
    const day = dummyDate.getDate();

    if (returnData === "locale-string") {
        return dt.toLocaleDateString();
    }
    if (returnData === "day") {
        return String(day);
    }
    if (returnData === "month") {
        return String(month.slice(0, 3));
    }
    if (returnData === "full-date") {
        return `${String(day)} ${String(month)}, ${dummyDate.getFullYear()}`;
    }
    if (returnData === "time") {
        const hours = dt.getHours();
        const minutes = dt.getMinutes();
        return `${hours}:${
            String(minutes).length === 1 ? `0${minutes}` : `${minutes}`
        } ${hours > 12 ? "PM" : "AM"}`;
    }
    if (returnData === "ddmmyy") {
        var newMonth: any = dummyDate.getMonth();
        newMonth = parseInt(newMonth) + 1;
        var newDay: any = day;
        var newYear = dummyDate.getFullYear();

        if (String(newMonth).length === 1) {
            newMonth = `0${newMonth}`;
        }
        if (String(newDay).length === 1) {
            newDay = `0${newDay}`;
        }
        return `${newYear}-${newMonth}-${newDay}`;
    }
};


