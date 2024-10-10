import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LangState = {
  lang: any;
};

const initialState: LangState = {
  lang: null, // Default theme
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.lang = state.lang === "en" ? "fr" : "en";
    },
    setLang: (state, action: PayloadAction<any>) => {
      state.lang = action.payload;
    },
  },
});

export const {toggleLang, setLang} = langSlice.actions;
export default langSlice.reducer;
