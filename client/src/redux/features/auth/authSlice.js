import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely load user data from standard web storage
// Avoids crashing the app if privacy tools aggressively block localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return { user: null };
    }
    return { user: JSON.parse(serializedState) };
  } catch (error) {
    console.error(error);
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

// Slice configuration for global user authentication state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sets active user on successful login/sign-up and persists to storage
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Clears user from global state and wipes footprint from local storage
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
