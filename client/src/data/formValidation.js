export const validateUrl = (spotifyUrl) => {
  const url = document.createElement("a");
  url.href = spotifyUrl;

  if (url.protocol != "https:") {
    return false;
  }

  if (url.hostname != "open.spotify.com") {
    return false;
  }

  if (!url.pathname.includes("/track/")) {
    return false;
  }

  return true;
};

export const defaultGenres = [
  "country",
  "electronic",
  "hip-hop",
  "jazz",
  "metal",
  "pop",
  "k-pop",
  "indie pop",
  "bedroom pop",
  "dance pop",
  "rock pop",
  "Rap",
  "blues",
  "eock",
  "indie rock",
  "hard rock",
  "soft rock",
  "dance rock",
  "alternative rock",
  "rock en espanol",
  "trova",
  "alternative",
];
