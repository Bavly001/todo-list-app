import { URL } from "../../utils/constants"
import { feedbackActions } from "./feedback-slice"

export const submitFeedback = (feedback) => {
      return async (dispatch) => {
            dispatch(feedbackActions.startSendingFeedback())
            const res = await fetch(URL + "feedbacks.json", { method: 'POST', body: JSON.stringify(feedback) })
            if (!res.ok) {
                  dispatch(feedbackActions.FeedbackFailed())
                  console.error(res.message)
                  return
            }
            dispatch(feedbackActions.FeedbackSent())
      }
}