import { BACKEND_PORT, BACKEND_URL } from "./constants";

export const signIn = async (credentials) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/signin`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
  }