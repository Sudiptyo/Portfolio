import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Admin/admin";
import feedbackReducer from "./Feedback/Feedback";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    feedback: feedbackReducer,
  },
});

// These types are not required for Redux to work. They're there to make TypeScript understand your Redux store and catch mistakes while you're coding.

export type RootState = ReturnType<typeof store.getState>; // This tells TypeScript the exact shape of your Redux state.

// Now when using useSelector:
// const feedback = useSelector(
//   (state: RootState) => state.feedback
// );

export type AppDispatch = typeof store.dispatch; //The dispatch function in my app can dispatch async thunks too, without it useDispatch() assumes the default Redux dispatch type.

// Type	        Used for	              Needed when
// AppDispatch	Typing dispatch	     When dispatching async thunks (createAsyncThunk)
// RootState	Typing useSelector	 When reading data from Redux state
