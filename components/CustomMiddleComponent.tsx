/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useImperativeHandle,
    forwardRef,
} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FlatList,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";

interface CustomMiddleComponentProps {
    array: any[];
    setArray: React.Dispatch<React.SetStateAction<any[]>>;
    originalData: any[];
    filterFunction: (item: any, searchText: string) => boolean;
}

export interface CustomMiddleComponentRef {
    handleSearch: (text: string) => void;
}

// Custom debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const CustomMiddleComponent = forwardRef<
    CustomMiddleComponentRef,
    CustomMiddleComponentProps
>(({ array, setArray, originalData, filterFunction }, ref) => {
    const [searchText, setSearchText] = useState<string>("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const searchInputRef = useRef<TextInput & TextInputProps>(null);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    // Handle search functionality with debouncing
    const handleSearch = useCallback(
        debounce((text: string) => {
            const lowerCaseText = text.toLowerCase();
            const newFilteredData = originalData.filter((item) =>
                filterFunction(item, lowerCaseText)
            );
            setArray(newFilteredData);
            updateRecentSearches(text);
        }, 300),
        [originalData, filterFunction]
    );

    const updateRecentSearches = (text: string) => {
        if (text.trim() && !recentSearches.includes(text)) {
            setRecentSearches((prevSearches) => [
                text,
                ...prevSearches.slice(0, 4),
            ]);
        }
    };

    const clearSearch = () => {
        setSearchText("");
        if (searchInputRef.current) {
            searchInputRef.current.clear();
        }
        setArray(originalData); // Reset to original data
    };

    const handleRecentSearch = (text: string) => {
        setSearchText(text);
        handleSearch(text);
    };

    useEffect(() => {
        if (searchText.trim().length === 0) {
            setArray(originalData); // Reset to original data if search text is cleared
        }
    }, [searchText, originalData, setArray]);

    // Use useImperativeHandle to expose handleSearch to parent components
    useImperativeHandle(ref, () => ({
        handleSearch,
    }));

    return (
        <View
            style={{
                width: 224,
                height: 28,
                borderWidth: 0.2,
                borderRadius: 8,
                backgroundColor: Colors.searchBg,
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    height: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 8,
                    gap: 5,
                    paddingHorizontal: 10,
                }}
            >
                <MaterialCommunityIcons
                    name="magnify"
                    size={16}
                    color={Colors.greyPost}
                />
                <TextInput
                    ref={searchInputRef}
                    style={[
                        styles.input,
                        {
                            color: Colors.welcomeText,
                            fontSize: 12,
                            opacity: 0.5,
                            justifyContent: "center",
                            width: "80%"
                        },
                    ]}
                    placeholder="Search"
                    placeholderTextColor={Colors.greyPost}
                    onChangeText={(text) => {
                        setSearchText(text);
                        handleSearch(text);
                    }}
                    value={searchText}
                />
                {searchText ? (
                    <TouchableOpacity onPress={clearSearch}>
                        <MaterialCommunityIcons
                            name="close-circle"
                            size={16}
                            color={Colors.welcomeText}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
            {/* {recentSearches.length > 0 && (
                <FlatList
                    data={recentSearches}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleRecentSearch(item)}
                        >
                            <Text style={styles.recentSearchItem}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    style={styles.recentSearchList}
                    showsHorizontalScrollIndicator={false}
                />
            )} */}
        </View>
    );
});

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    recentSearchList: {
        marginTop: 10,
    },
    recentSearchItem: {
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: 14,
    },
});

export default CustomMiddleComponent;
