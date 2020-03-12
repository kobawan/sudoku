const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://damp-refuge-15092.herokuapp.com"
    : "http://localhost:5000";

export const REGISTER_USER = `${SERVER_URL}/registerUser`;
export const SAVE_GAME = `${SERVER_URL}/saveGame`;

export const getUserEndpoint = (id: string) => `${SERVER_URL}/user/${id}`;
