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

/*
*     val room: UInt = 0u,
    val beforeTimestamp: Instant? = null,
    val beforeMessageUuid: @Contextual UUID? = null
* */

export const messagesHistory = async (room: string, token: string) => {
  const url = new URL(`${API_URL}/messages`);
  url.searchParams.set("room", room);

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  return await fetch(url, {
    method: "GET",
    headers,
  });
};
