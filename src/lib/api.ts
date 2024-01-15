const API_URL = `${import.meta.env.VITE_HTTP_PROTO}://${import.meta.env.VITE_API_URL}`;

export const isErrorJson = (json: unknown): json is { error: boolean; message: string } => {
  return (
    json != null &&
    typeof json === "object" &&
    "error" in json &&
    "message" in json &&
    typeof json.error === "boolean" &&
    typeof json.message === "string"
  );
};

export const register = async (username: string, password: string) => {
  return await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
