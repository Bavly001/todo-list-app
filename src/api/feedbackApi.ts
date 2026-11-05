import { apiClient } from './client';

export const feedbackApi = {
  submitFeedback: async (feedback: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    dateAndTime?: string;
  }): Promise<any> => {
    const res = await apiClient.post('/api/feedbacks', feedback);
    return res.data;
  },
};

