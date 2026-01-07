import { setAuthToken } from "./api";

const TOKEN_KEY = "ataluxtrip_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthToken(token);
}

export function loadToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) setAuthToken(token);
  return token;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  setAuthToken(null);
}

