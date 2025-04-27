import { API_ENDPOINTS } from "~/constants/api-endpoints";

interface SignUpBody {
  email: string;
  password: string;
  subscribe: boolean;
}

type SignUpResponse = {
  statusCode: number;
  message: string;
}

export const signUp = async (body: SignUpBody) => {
  try {
    const response: SignUpResponse = await $fetch(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body,
    });

    if (response.statusCode === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false, serviceError: true };
  }
};