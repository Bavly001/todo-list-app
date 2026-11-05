import { feedbackActions } from "./feedback-slice";
import { feedbackApi } from "../../api";

export const submitFeedback = (feedback: any) => {
  return async (dispatch: any) => {
    dispatch(feedbackActions.startSendingFeedback());
    try {
      await feedbackApi.submitFeedback(feedback);
      dispatch(feedbackActions.FeedbackSent());
    } catch (err: any) {
      console.error(err?.message || 'Failed to submit feedback');
      dispatch(feedbackActions.FeedbackFailed());
    }
  };
};
