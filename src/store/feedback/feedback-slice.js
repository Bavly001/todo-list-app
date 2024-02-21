import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: false, succeeded: false }

const feedbackSlice = createSlice({
      name: 'feedback',
      initialState,
      reducers: {
            startSendingFeedback(state) {
                  state.loading = true
                  state.error = false
                  state.succeeded = false
            },
            FeedbackSent(state) {
                  state.succeeded = true
                  state.loading = false
                  state.error = false
            },
            FeedbackFailed(state) {
                  state.error = true
                  state.succeeded = false
                  state.loading = false
            },
      }
})

export const feedbackActions = feedbackSlice.actions
export default feedbackSlice.reducer