/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState } from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import DOMAIN from "@/components/(Utils)/domain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ImageManipulator from "expo-image-manipulator";
import {ImagePickerAsset, ImagePickerResult} from "expo-image-picker";
interface Payload {
  pin: string;
  email: string;
}

interface Payload10 {
  email: string;
}
interface PayloadUpdatedData {
  email: string;
}

interface Token {
  token: string;
  expoPushToken: any;
}
interface ChoosenLanguageInterface {
  choosenLanguage: string;
}
interface FormData {
  fullname: string;
  email: string;
  betId: string;
  number: number;
  password: string;
  referId: string;
}
interface FormData2 {
  fullname: string;
  email: string;
  number: number | string;
  betId: string;
}

interface FormDataz {
  email: string;
  password: number | string;
}

interface payload {
  email: string;
}

interface Payload2 {
  choosenImage: ImagePickerAsset[];
  email: string;
}

interface Payload2222 {
  email: string;
  inputedImage: {
    uri: string;
    name: string;
    type: string;
  } | null;
}

interface FormData3 {
  email: string;
  betId: string;
  amount: number;
}

interface FormData4 {
  email: string;
}

interface FormData5 {
  betId: string;
  amount: number;
  email: string;
  momoNumber: number;
  service: string;
  network: string;
  bonusBalance: number;
}
interface FormData9 {
  betId: string;
  amount: number;
  email: string;
  momoNumber: number;
  service: string;
  bonusBalance: number;
}

interface formData6 {
  email: string;
  password: string;
  newPassword: string;
}
interface formData6B {
  email: string;

  newPassword: string;
}
interface formdata7 {
  email: string;
}
interface formdata8 {
  pin: string;
  id: string;
}

interface formdata8B {
  pin: string;
  email: string;
}

interface LeaguePayload {
  email: string;
  inputedImage: {
    uri: string;
    name: string;
    type: string;
  } | null; // It can be null if no image is selected
  league: string;
}
interface TeamPayload {
  email: string;
  inputedImage: {
    uri: string;
    name: string;
    type: string;
  } | null; // It can be null if no image is selected
  team: string;
}
interface LeaguePayload11 {
  id: string;
  email: string;
  image: string;
  league: string;
}
interface LeaguePayload12 {
  id: string;
  email: string;
  image: string;
  team: string;
}

interface MatchPredictionPayload {
  time?: string;
  team1?: string;
  team1_flag?: string;
  team2?: string;
  team2_flag?: string;
  league?: string;
  league_flag?: string;
  tip?: string;
}

interface updateMatchPrediction {
  time?: string;
  team1?: string;
  team1_flag?: string;
  team2?: string;
  team2_flag?: string;
  league?: string;
  league_flag?: string;
  tip?: string;
  status?: string;
  id?: string;
}

interface DeleteMatchPredictionPayload {
  id?: string;
}

interface LeaguePayload10 {
  email: string;
}
// Place this in a type declaration file, e.g., `typings.d.ts` or directly in your script
declare global {
  // Extend FormData to accept additional types for React Native
  interface FormData {
    append(name: string, value: any, fileName?: string): void;
  }
}

const getUserData = createSlice({
  name: "getUserData",
  initialState: {
    currentLanguage: "",
    isLoading: false,
    data: initialState,
    colorScheme: "",
    success: false,
  },
  reducers: {
    // increment: (state) => {
    // state.value += 1;
    // },
    // decrement: (state) => {
    // state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    // state.value += action.payload;
    // },
  },
  extraReducers: (builder: any) => {
    return builder
      .addCase(signUpUser.pending, (state: {isLoading: boolean}) => {
        console.log("signUpUser pending");
        state.isLoading = true;
      })
      .addCase(signInUser.pending, (state: {isLoading: boolean}) => {
        console.log("signInUser pending");
        state.isLoading = true;
      })
      .addCase(setUpUserPin.pending, (state: {isLoading: boolean}) => {
        console.log("setUpUserPin pending");
        state.isLoading = true;
      })
      .addCase(getUser.pending, (state: {isLoading: boolean}) => {
        console.log("getUser pending");
        state.isLoading = true;
      })
      .addCase(verifyUserPin.pending, (state: {isLoading: boolean}) => {
        console.log("verifyUserPin pending");
        state.isLoading = true;
      })
      .addCase(editProfileImage.pending, (state: {isLoading: boolean}) => {
        console.log("editProfileImage pending");
        state.isLoading = true;
      })
      .addCase(changeUserDetails.pending, (state: {isLoading: boolean}) => {
        console.log("changeUserDetails pending");
        state.isLoading = true;
      })
      .addCase(genarateQRCode.pending, (state: {isLoading: boolean}) => {
        console.log("genarateQRCode pending");
        state.isLoading = true;
      })
      .addCase(deposit.pending, (state: {isLoading: boolean}) => {
        console.log("deposit pending");
        state.isLoading = true;
      })
      .addCase(changeColorScheme.pending, (state: {isLoading: boolean}) => {
        console.log("changeColorScheme pending");
        state.isLoading = true;
      })
      .addCase(walletdeposit.pending, (state: {isLoading: boolean}) => {
        console.log("walletdeposit pending");
        state.isLoading = true;
      })
      .addCase(withdrawal.pending, (state: {isLoading: boolean}) => {
        console.log("withdrawal pending");
        state.isLoading = true;
      })
      .addCase(walletSend.pending, (state: {isLoading: boolean}) => {
        console.log("walletSend pending");
        state.isLoading = true;
      })
      .addCase(resetTag.pending, (state: {isLoading: boolean}) => {
        console.log("resetTag pending");
        state.isLoading = true;
      })
      .addCase(
        signUpUser.fulfilled,
        (
          state: {success: any; data: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("incrementAsync.done");
          state.success = action.payload.success;
          action.payload.success === true
            ? (state.data = action.payload.savedUser)
            : null;
          state.isLoading = false;
        }
      )
      .addCase(
        signInUser.fulfilled,
        (
          state: {
            success: any;
            data: {email: any};
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("signInUser done");
          state.success = action.payload.success;
          console.log(action.payload.savedUser, "sytvhvhjvhvhj done");
          action.payload.success === true
            ? (state.data = action.payload.savedUser)
            : null;
          if (action.payload.success === 504) {
            state.data.email = action.payload.email;
          }
          state.isLoading = false;
        }
      )
      .addCase(
        setUpUserPin.fulfilled,
        (
          state: {success: any; data: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("setUpUserPin done");
          state.success = action.payload.success;
          // console.log(action.payload.savedUser, "sytvhvhjvhvhj done");
          action.payload.success === true
            ? (state.data = action.payload.savedUser)
            : null;
          state.isLoading = false;
        }
      )
      .addCase(
        verifyUserPin.fulfilled,
        (
          state: {success: any; data: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("verifyUserPin done");
          state.success = action.payload.success;
          // console.log(action.payload.savedUser, "sytvhvhjvhvhj done");
          action.payload.success === true
            ? (state.data = action.payload.savedUser)
            : null;
          state.isLoading = false;
        }
      )
      .addCase(
        getUpdatedData.fulfilled,
        (
          state: {success: any; data: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("getUpdatedData done");
          state.success = action.payload.success;
          // console.log(action.payload.savedUser, "sytvhvhjvhvhj done");
          action.payload.success === true
            ? (state.data = action.payload.savedUser)
            : null;
          state.isLoading = false;
        }
      )
      .addCase(getUser.fulfilled, (state: any, action: PayloadAction<any>) => {
        console.log("getUser done");
        // console.log(action.payload.email);
        console.log(action.payload.success);
        state.success = action.payload.success;
        if (action.payload.success === 503) {
          state.data.email = action.payload.email;
          state.data.fullname = action.payload.fullname;
        }
        if (action.payload.success === true) {
          state.data = action.payload.savedUser;
        }

        state.isLoading = false;
      })

      .addCase(
        editProfileImage.fulfilled,
        (
          state: {
            success: any;
            data: {image: any};
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("editProfileImage done");
          state.success = action.payload.success;
          console.log(action.payload.success, "eror status");
          if (action.payload.success === true) {
            state.data.image = action.payload.image;
          }
          state.isLoading = false;
        }
      )
      .addCase(
        changeUserDetails.fulfilled,
        (
          state: {success: any; data: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("changeUserDetails done");
          state.success = action.payload.success;
          if (action.payload.success === true) {
            state.data = action.payload.user;
          }
          state.isLoading = false;
        }
      )
      .addCase(
        genarateQRCode.fulfilled,
        (
          state: {success: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("genarateQRCode done");
          state.success = action.payload.success;
          if (action.payload.success === true) {
            console.log(action.payload.id);
          }
          state.isLoading = false;
        }
      )
      .addCase(
        resetPassword.fulfilled,
        (
          state: {success: any; isLoading: boolean},
          action: PayloadAction<any>
        ) => {
          console.log("resetPassword done");
          state.success = action.payload.success;
          if (action.payload.success === true) {
            console.log(action.payload.id);
          }
          state.isLoading = false;
        }
      )
      .addCase(
        deposit.fulfilled,
        (
          state: {
            success: any;
            data: {
              transactionHistory: any[];
              bonusBalance: any;
            };
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log(action.payload.newUserBonus, "deposit done");
          state.success = action.payload.success;
          if (
            action.payload.success === true ||
            action.payload.success === 209
          ) {
            state.data = action?.payload?.user;
          }
          state.isLoading = false;
        }
      )
      .addCase(
        walletdeposit.fulfilled,
        (
          state: {
            success: any;
            data: {
              transactionHistory: any[];
              bonusBalance: any;
            };
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("walletdeposit done");
          state.success = action.payload.success;
          if (
            action.payload.success === true ||
            action.payload.success === 209
          ) {
            state?.data?.transactionHistory?.push(
              action?.payload?.userTransaction
            );
            if (action.payload.newUserBonus) {
              state.data.bonusBalance = action.payload.newUserBonus;
            }
          }
          state.isLoading = false;
        }
      )
      .addCase(
        withdrawal.fulfilled,
        (
          state: {
            success: any;
            data: {
              transactionHistory: any[];
              bonusBalance: any;
            };
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("withdrawal done");
          state.success = action.payload.success;
          if (
            action.payload.success === true ||
            action.payload.success === 209
          ) {
            state.data = action?.payload?.user;
          }
          state.isLoading = false;
        }
      )

      .addCase(
        walletSend.fulfilled,
        (
          state: {
            success: any;
            data: {
              transactionHistory: any[];
              bonusBalance: any;
            };
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("walletSend done");
          state.success = action.payload.success;
          if (action.payload.success === true) {
            state?.data?.transactionHistory?.push(
              action?.payload?.userTransaction
            );
            if (action.payload.updatedBalance) {
              state.data.bonusBalance = action.payload.updatedBalance;
            }
          }
          state.isLoading = false;
        }
      )

      .addCase(
        getColorScheme.fulfilled,
        (
          state: {
            success: any;
            colorScheme: any;
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log(action.payload, "getColorScheme done");
          state.success = action.payload.success;
          state.colorScheme = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        getCurrentLanguage.fulfilled,
        (
          state: {
            success: any;
            currentLanguage: any;
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log(action.payload, "getCurrentLanguage done");
          state.success = action.payload.success;
          state.currentLanguage = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        changeCurrentLanguage.fulfilled,
        (state: {currentLanguage: any}, action: PayloadAction<any>) => {
          console.log(action.payload, "changeCurrentLanguage done");

          state.currentLanguage = action.payload;
        }
      )
      .addCase(
        changeColorScheme.fulfilled,
        (
          state: {
            success: any;
            colorScheme: any;
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log(action.payload, "changeColorScheme done");
          state.success = action.payload.success;
          state.colorScheme = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        resetTag.fulfilled,
        (
          state: {
            success: any;
            data: {tag: any};
            isLoading: boolean;
          },
          action: PayloadAction<any>
        ) => {
          console.log("resetTag done");
          state.success = action.payload.success;
          if (action.payload.success === true) {
            state.data.tag = action.payload.updatedTag;
          }
          state.isLoading = false;
        }
      )

      .addCase(signUpUser.rejected, (state: {isLoading: boolean}) => {
        console.log("incrementAsync.failed");
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state: {isLoading: boolean}) => {
        console.log("signInUser failed");
        state.isLoading = false;
      })
      .addCase(setUpUserPin.rejected, (state: {isLoading: boolean}) => {
        console.log("setUpUserPin failed");
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state: {isLoading: boolean}) => {
        console.log("getUser failed");
        state.isLoading = false;
      })
      .addCase(verifyUserPin.rejected, (state: {isLoading: boolean}) => {
        console.log("verifyUserPin failed");
        state.isLoading = false;
      })
      .addCase(editProfileImage.rejected, (state: {isLoading: boolean}) => {
        console.log("editProfileImage failed");
        state.isLoading = false;
      })
      .addCase(changeUserDetails.rejected, (state: {isLoading: boolean}) => {
        console.log("changeUserDetails failed");
        state.isLoading = false;
      })
      .addCase(genarateQRCode.rejected, (state: {isLoading: boolean}) => {
        console.log("genarateQRCode failed");
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state: {isLoading: boolean}) => {
        console.log("resetPassword failed");
        state.isLoading = false;
      })
      .addCase(deposit.rejected, (state: {isLoading: boolean}) => {
        console.log("deposit failed");
        state.isLoading = false;
      })
      .addCase(changeColorScheme.rejected, (state: {isLoading: boolean}) => {
        console.log("changeColorScheme failed");
        state.isLoading = false;
      })
      .addCase(walletdeposit.rejected, (state: {isLoading: boolean}) => {
        console.log("walletdeposit failed");
        state.isLoading = false;
      })
      .addCase(withdrawal.rejected, (state: {isLoading: boolean}) => {
        console.log("withdrawal failed");
        state.isLoading = false;
      })
      .addCase(walletSend.rejected, (state: {isLoading: boolean}) => {
        console.log("walletSend failed");
        state.isLoading = false;
      });
  },
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      return token;
    } else {
      throw new Error("No token found");
    }
  } catch (error) {
    console.error("Failed to retrieve token", error);
    throw error;
  }
};

const makeAuthenticatedRequest = async (url: any, options = {}) => {
  const token = await getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

export const signUpUser = createAsyncThunk(
  "getUserData/signUpUser",
  async (formData: FormData) => {
    console.log(DOMAIN, formData, "DOMAIN");
    const response = await fetch(`${DOMAIN}/api/usersWithoutToken/register`, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
      },
      body: JSON.stringify({
        // Stringify the JSON body
        fullname: formData.fullname,
        betId: formData.betId,
        email: formData.email,
        number: formData.number,
        password: formData.password,
        referrerId: formData.referId,
      }),
    });

    const resultData = await response.json();
    return resultData;
  }
);

export const signInUser = createAsyncThunk(
  "getUserData/signInUser",
  async ({email, password}: any) => {
    console.log({email, password});
    const response = await fetch(`${DOMAIN}/api/usersWithoutToken/login`, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resultData = await response.json();
    return resultData;
  }
);

export const setUpUserPin = createAsyncThunk(
  "getUserData/setUpUserPin",
  async (payload: Payload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/setPin`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: payload.pin,
            email: payload.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUserData/getUser",
  async (token: Token) => {
    const response = await fetch(`${DOMAIN}/api/users/getUser`, {
      method: "POST", // Specify the method
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
      },
      body: JSON.stringify({
        token: token.token,
        expoPushToken: token.expoPushToken,
      }),
    });

    const resultData = await response.json();
    return resultData;
  }
);

export const verifyUserPin = createAsyncThunk(
  "getUserData/verifyUserPin",
  async (payload: Payload, {rejectWithValue}: any) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/verifyUserPin`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: payload.pin,
            email: payload.email,
          }),
        }
      );
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUserWithBiometrics = createAsyncThunk(
  "getUserData/loginUserWithBiometrics",
  async (payload: Payload, {rejectWithValue}: any) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/loginUserWithBiometrics`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: payload.pin,
            email: payload.email,
          }),
        }
      );
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUpdatedData = createAsyncThunk(
  "getUserData/getUpdatedData",
  async (payload: PayloadUpdatedData, {rejectWithValue}: any) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/getUpdatedData`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: payload.email,
          }),
        }
      );
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProfileImage = createAsyncThunk(
  "getUserData/editProfileImage",
  async (payload: Payload2222, {rejectWithValue}) => {
    try {
      let file = null; // Initialize file as null

      // Check if an image was selected
      if (payload.inputedImage) {
        // Manipulate image (compress and change format to JPEG)
        const manipResult = await ImageManipulator.manipulateAsync(
          payload.inputedImage.uri, // Directly using the URI from payload
          [], // No transformations; just compress
          {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG} // Compress and save as JPEG
        );

        // Prepare the file for uploading
        file = {
          uri: manipResult.uri, // Use the uri from the manipResult
          name: payload.inputedImage.name || "profile-image.jpg", // Default name for the image
          type: "image/jpeg", // MIME type for JPEG
        };
      }

      // Prepare FormData
      const formData = new FormData();
      if (file) {
        formData.append("image", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      } else {
        formData.append("image", null); // Send null if no image is selected
      }
      formData.append("email", payload.email);

      console.log(formData, "gcggchchchchb hvhvhvhvhch");

      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/editProfileImage`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Failed to upload image.");
      }
      
      const resultData = await response.json();

      console.log(resultData, "dyyguducgugcjjh");
      
      return resultData;
    } catch (error: any) {
      console.error("editProfileImage error:", error);
      return rejectWithValue(error.message || "Unexpected error");
    }
  }
);

export const changeUserDetails = createAsyncThunk(
  "getUserData/changeUserDetails",
  async (formData: FormData2, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/changeUserDetails`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            fullname: formData.fullname,
            email: formData.email,
            number: formData.number,
            betId: formData.betId,
          }),
        }
      );

      const resultData = await response.json();

      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const genarateQRCode = createAsyncThunk(
  "getUserData/genarateQRCode",
  async (formData: FormData3, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/generateQRCode`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            betId: formData.betId,
            amount: formData.amount,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const searchSendingPage = createAsyncThunk(
  "getUserData/searchSendingPage",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/searchSendingPage`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            _id: formData._id,
            value: formData.value,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "getUserData/resetPassword",
  async (formData: FormData4) => {
    const response = await fetch(
      `${DOMAIN}/api/usersWithoutToken/resetPassword`,
      {
        method: "POST", // Specify the method
        headers: {
          "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      }
    );

    const resultData = await response.json();
    return resultData;
  }
);

export const deposit = createAsyncThunk(
  "getUserData/deposit",
  async (formData: FormData5, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/deposit`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            betId: formData.betId,
            momoNumber: formData.momoNumber,
            amount: formData.amount,
            service: formData.service,
            network: formData.network,
            bonusBalance: formData.bonusBalance,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSocials = createAsyncThunk(
  "getUserData/getSocials",
  async (_, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/getSocials`,
        {
          method: "GET", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPrivacyPolicies = createAsyncThunk(
  "getUserData/fetchPrivacyPolicies",
  async (_, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/privacy-policies`,
        {
          method: "GET", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordForLoggedInUser = createAsyncThunk(
  "getUserData/resetPasswordForLoggedInUser",
  async (formData: formData6, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/resetPasswordForLoggedInUser`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            newPassword: formData.newPassword,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const resetPasswordForLoggedInUser2 = createAsyncThunk(
  "getUserData/resetPasswordForLoggedInUser2",
  async (formData: formData6B) => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/usersWithoutToken/resetPasswordForLoggedInUser2`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const requestPin = createAsyncThunk(
  "getUserData/requestPin",
  async (formdata: formdata7, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/requestPin`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formdata.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkPin = createAsyncThunk(
  "getUserData/checkPin",
  async (formdata: formdata8, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/checkPin`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: formdata.pin,
            id: formdata.id,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkPin2 = createAsyncThunk(
  "getUserData/checkPin2",
  async (formdata: formdata8B) => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/usersWithoutToken/checkPin2`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: formdata.pin,
            email: formdata.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const changeUserPin = createAsyncThunk(
  "getUserData/changeUserPin",
  async (payload: Payload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/changeUserPin`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            pin: payload.pin,
            email: payload.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const walletdeposit = createAsyncThunk(
  "getUserData/walletdeposit",
  async (formData: FormData9, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/walletdeposit`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            betId: formData.betId,
            momoNumber: formData.momoNumber,
            amount: formData.amount,
            service: formData.service,
            bonusBalance: formData.bonusBalance,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const withdrawal = createAsyncThunk(
  "getUserData/withdrawal",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/withdrawal`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            _id: formData._id,
            betId: formData.betId,
            momoNumber: formData.momoNumber,
            email: formData.email,
            service: formData.service,
            amount: formData.amount,
            bonusBalance: formData.bonusBalance,
            withdrawalCode: formData.withdrawalCode,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestAddress = createAsyncThunk(
  "getUserData/requestAddress",
  async (_) => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/usersWithoutToken/requestAddress`,
        {
          method: "GET", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const walletSend = createAsyncThunk(
  "getUserData/walletSend",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/walletSend`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            id: formData.id,
            amount: formData.amount,
            recipientId: formData.recipientId,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getColorScheme = createAsyncThunk(
  "getUserData/getColorScheme",
  async () => {
    try {
      let storedColorScheme = await AsyncStorage.getItem("colorScheme");
      if (!storedColorScheme) {
        await AsyncStorage.setItem("colorScheme", "1");
        storedColorScheme = "1";
      }
      const colorScheme = parseInt(storedColorScheme);
      console.log("Color scheme updatedddd:", colorScheme);

      return colorScheme;
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const getModalState = createAsyncThunk(
  "getUserData/getModalState",
  async () => {
    try {
      const storedModalState = await AsyncStorage.getItem("modalState");
      if (!storedModalState) {
        return null;
      }
      return storedModalState;
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const changeModalState = createAsyncThunk(
  "getUserData/changeModalState",
  async () => {
    try {
      await AsyncStorage.setItem("modalState", "true");
      return true;
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const getCurrentLanguage = createAsyncThunk(
  "getUserData/getCurrentLanguage",
  async () => {
    try {
      const storedCurrentLanguage =
        await AsyncStorage.getItem("currentLanguage");
      return storedCurrentLanguage;
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const changeColorScheme = createAsyncThunk(
  "getUserData/changeColorScheme",
  async () => {
    try {
      let storedColorScheme = await AsyncStorage.getItem("colorScheme");
      if (storedColorScheme === "2") {
        await AsyncStorage.setItem("colorScheme", "1");
        storedColorScheme = "1";
        const colorScheme = parseInt(storedColorScheme);
        console.log("Color scheme updatedddd:", colorScheme);

        return colorScheme;
      } else if (storedColorScheme === "1") {
        await AsyncStorage.setItem("colorScheme", "2");
        storedColorScheme = "2";
        const colorScheme = parseInt(storedColorScheme);
        console.log("Color scheme updatedddd:", colorScheme);
        return colorScheme;
      }
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const changeCurrentLanguage = createAsyncThunk(
  "getUserData/changeCurrentLanguage",
  async (sentValue: ChoosenLanguageInterface) => {
    const value = sentValue.choosenLanguage;
    try {
      await AsyncStorage.setItem("currentLanguage", value);
      return value;
    } catch (error) {
      console.error("Error retrieving or setting color scheme:", error);
      throw error;
    }
  }
);

export const resetTag = createAsyncThunk(
  "getUserData/setTag",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/setTag`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            tag: formData.tag,
            email: formData.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTotalReferral = createAsyncThunk(
  "getUserData/getTotalReferral",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/getTotalReferral`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitDeleteAccountForm = createAsyncThunk(
  "getUserData/submitDeleteAccountForm",
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/users/submitDeleteAccountForm`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows to expect JSON
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editLeague = createAsyncThunk(
  "getUserData/editLeague",
  async (payload: LeaguePayload, {rejectWithValue}) => {
    try {
      let file = null; // Initialize file as null

      // Check if an image was selected
      if (payload.inputedImage) {
        // Manipulate image (compress and change format to JPEG)
        const manipResult = await ImageManipulator.manipulateAsync(
          payload.inputedImage.uri, // Directly using the URI from payload
          [], // No transformations; just compress
          {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG} // Compress and save as JPEG
        );

        // Prepare the file for uploading
        file = {
          uri: manipResult.uri, // Use the uri from the manipResult
          name: payload.inputedImage.name || "profile-image.jpg", // Default name for the image
          type: "image/jpeg", // MIME type for JPEG
        };
      }

      // Prepare FormData
      const formData = new FormData();
      if (file) {
        formData.append("image", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      } else {
        formData.append("image", null); // Send null if no image is selected
      }
      formData.append("email", payload.email); // Include the email
      formData.append("league", payload.league); // Include the league (if applicable)

      console.log(formData, "formData");
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/createLeague`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const editTeam = createAsyncThunk(
  "getUserData/editTeam",
  async (payload: TeamPayload, {rejectWithValue}) => {
    try {
      let file = null; // Initialize file as null

      // Check if an image was selected
      if (payload.inputedImage) {
        // Manipulate image (compress and change format to JPEG)
        const manipResult = await ImageManipulator.manipulateAsync(
          payload.inputedImage.uri, // Directly using the URI from payload
          [], // No transformations; just compress
          {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG} // Compress and save as JPEG
        );

        // Prepare the file for uploading
        file = {
          uri: manipResult.uri, // Use the uri from the manipResult
          name: payload.inputedImage.name || "profile-image.jpg", // Default name for the image
          type: "image/jpeg", // MIME type for JPEG
        };
      }

      // Prepare FormData
      const formData = new FormData();
      if (file) {
        formData.append("image", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      } else {
        formData.append("image", null); // Send null if no image is selected
      }
      formData.append("email", payload.email); // Include the email
      formData.append("team", payload.team); // Include the league (if applicable)

      console.log(formData, "formData");
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/createTeam`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const getLeague = createAsyncThunk(
  "getUserData/getLeague",
  async (payload: LeaguePayload10, {rejectWithValue}) => {
    console.log(payload.email, "vbfbfbfbfbfb");
    try {
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/getLeague`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const getTeam = createAsyncThunk(
  "getUserData/getTeam",
  async (payload: LeaguePayload10, {rejectWithValue}) => {
    console.log(payload.email, "vbfbfbfbfbfb");
    try {
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/getTeam`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLeague = createAsyncThunk(
  "getUserData/deleteLeague",
  async (payload: LeaguePayload11, {rejectWithValue}) => {
    try {
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/deleteLeague`,
        {
          method: "POST",
          body: JSON.stringify({
            id: payload.id,
            image: payload.image,
            email: payload.email,
            league: payload.league,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "getUserData/deleteTeam",
  async (payload: LeaguePayload12, {rejectWithValue}) => {
    try {
      // Make authenticated request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/deleteTeam`,
        {
          method: "POST",
          body: JSON.stringify({
            id: payload.id,
            image: payload.image,
            email: payload.email,
            team: payload.team,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);
export const createMatchPrediction = createAsyncThunk(
  "getUserData/createMatchPrediction",
  async (payload: MatchPredictionPayload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/createMatchPrediction`,
        {
          method: "POST",
          body: JSON.stringify({
            league: payload?.league,
            time: payload?.time,
            team1: payload?.team1,
            team1_flag: payload?.team1_flag,
            team2: payload?.team2,
            team2_flag: payload?.team2_flag,
            league_flag: payload?.league_flag,
            tip: payload?.tip,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const createMatchPrediction2 = createAsyncThunk(
  "getUserData/createMatchPrediction2",
  async (payload: MatchPredictionPayload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/createMatchPrediction2`,
        {
          method: "POST",
          body: JSON.stringify({
            league: payload?.league,
            time: payload?.time,
            team1: payload?.team1,
            team1_flag: payload?.team1_flag,
            team2: payload?.team2,
            team2_flag: payload?.team2_flag,
            league_flag: payload?.league_flag,
            tip: payload?.tip,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);
export const updateMatchPrediction = createAsyncThunk(
  "getUserData/updateMatchPrediction",
  async (payload: updateMatchPrediction, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/updateMatchPrediction`,
        {
          method: "POST",
          body: JSON.stringify({
            league: payload?.league,
            time: payload?.time,
            team1: payload?.team1,
            team1_flag: payload?.team1_flag,
            team2: payload?.team2,
            team2_flag: payload?.team2_flag,
            league_flag: payload?.league_flag,
            tip: payload?.tip,
            status: payload?.status,
            id: payload?.id,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const updateMatchPrediction2 = createAsyncThunk(
  "getUserData/updateMatchPrediction2",
  async (payload: updateMatchPrediction, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/updateMatchPrediction2`,
        {
          method: "POST",
          body: JSON.stringify({
            league: payload?.league,
            time: payload?.time,
            team1: payload?.team1,
            team1_flag: payload?.team1_flag,
            team2: payload?.team2,
            team2_flag: payload?.team2_flag,
            league_flag: payload?.league_flag,
            tip: payload?.tip,
            status: payload?.status,
            id: payload?.id,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMatchPrediction = createAsyncThunk(
  "getUserData/deleteMatchPrediction",
  async (payload: DeleteMatchPredictionPayload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/deleteMatchPrediction`,
        {
          method: "POST",
          body: JSON.stringify({
            id: payload?.id,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMatchPrediction2 = createAsyncThunk(
  "getUserData/deleteMatchPrediction2",
  async (payload: DeleteMatchPredictionPayload, {rejectWithValue}) => {
    try {
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/deleteMatchPrediction2`,
        {
          method: "POST",
          body: JSON.stringify({
            id: payload?.id,
          }),
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for file upload
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      // Get the result data from the response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

export const getMatchPrediction = createAsyncThunk(
  "getUserData/getMatchPrediction",
  async (_, {rejectWithValue}) => {
    try {
      console.log("Fetching match predictions...");

      // Make the authenticated GET request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/getAllMatchPrediction`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      // Parse and return the JSON response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      console.error("Error fetching match predictions:", error);
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

export const getMatchPrediction2 = createAsyncThunk(
  "getUserData/getMatchPrediction2",
  async (_, {rejectWithValue}) => {
    try {
      console.log("Fetching match predictions...");

      // Make the authenticated GET request
      const response = await makeAuthenticatedRequest(
        `${DOMAIN}/api/predictions/getAllMatchPrediction2`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      // Parse and return the JSON response
      const resultData = await response.json();
      return resultData;
    } catch (error: any) {
      console.error("Error fetching match predictions:", error);
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);





export default getUserData.reducer;

// async function manipulateImage(uri: string) {
// try {
// const manipResult = await ImageManipulator.manipulateAsync(
// uri,
// [], // No transformations
// {compress: 0.7, format: ImageManipulator.SaveFormat.WEBP}
// );
// console.log("Manipulated Image URI:", manipResult.uri);
// return manipResult.uri;
// } catch (error) {
// console.error("Failed to manipulate image:", error);
// }
// }
// manipulateImage(
// "file:///var/mobile/Containers/Data/Application/5E4C6CFD-2099-4359-BA61-7F434CBE7641/Library/Caches/ExponentExperienceData/@anonymous/TheBetFundrApp-fa170e97-73df-4586-8acf-c9ced3644942/ImagePicker/E574A2FA-B23C-4091-BDAF-22CA77A420F0.jpg"
// )
