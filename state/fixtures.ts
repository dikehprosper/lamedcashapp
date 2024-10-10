/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGroupedFixturesByDate } from "@/utils/groupFixturesData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import DOMAIN from "@/components/(Utils)/domain";
const getFixturesURL = `${DOMAIN}/api/fixtures`;

const fixturesSlice = createSlice({
    name: "fixtures",
    initialState: {
        fixtures: [],
        liveFixtures: [],
        upcomingFixtures: [],
        finishedFixtures: [],
        dateFilter: "",
        dateFixtures: [],
        isLoading: false,
    },
    reducers: {
        setFixtures: (state, action) => {
            state.fixtures = action.payload;
        },
        setLive: (state, action) => {
            state.liveFixtures = action.payload;
        },
        setUpcoming: (state, action) => {
            state.upcomingFixtures = action.payload;
        },
        setFinished: (state, action) => {
            state.finishedFixtures = action.payload;
        },
        setDateFilter: (state, action) => {
            state.dateFilter = action.payload;
        },
        removeDateFilter: (state) => {
            state.dateFilter = "";
            state.dateFixtures = [];
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchFixtures.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFixtures.fulfilled, (state, action) => {
                state.fixtures = action.payload;
                state.isLoading = false;
            })
            .addCase(getDateFixtures.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDateFixtures.fulfilled, (state, action) => {
                state.dateFixtures = action.payload;
                state.isLoading = false;
            })
            .addCase(updateFixtures.fulfilled, (state, action) => {
                state.fixtures = action.payload;
            }),
});

export const fetchFixtures = createAsyncThunk(
    "fixtures/fetchFixtures",
    async () => {
        const token = await AsyncStorage.getItem("token");
        const day = new Date();
        const formattedDate = `${format(day, "yyyy")}-${format(
            day,
            "MM"
        )}-${format(day, "dd")}`;

        const { success, message, data } = await fetch(
            getFixturesURL + `?date=${formattedDate}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
            }
        ).then((res) => res.json());

        if (success) {
            return getGroupedFixturesByDate(data);
        } else {
            return [];
        }
    }
);
export const updateFixtures = createAsyncThunk(
    "fixtures/updateFixtures",
    async (date: string) => {
        const token = await AsyncStorage.getItem("token");

        const { success, message, data } = await fetch(
            getFixturesURL + `?date=${date}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
            }
        ).then((res) => res.json());

        if (success) {
            return data;
        } else {
            return null;
        }
    }
);
export const getDateFixtures = createAsyncThunk(
    "fixtures/getDateFixtures",
    async (date: string) => {
        const token = await AsyncStorage.getItem("token");

        const { success, message, data } = await fetch(
            getFixturesURL + `?date=${date}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
            }
        ).then((res) => res.json());

        if (success) {
            return getGroupedFixturesByDate(data);
        } else {
            return null;
        }
    }
);

export const {
    setFixtures,
    removeDateFilter,
    setUpcoming,
    setLive,
    setDateFilter,
    setFinished,
} = fixturesSlice.actions;

export default fixturesSlice.reducer;
