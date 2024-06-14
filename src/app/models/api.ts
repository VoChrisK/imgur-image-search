export const getImagesBaseUri: string = "https://api.imgur.com/3/gallery/search/";

export const getImagesConfig: RequestInit = {
  method: "GET", 
  headers: {
    "Content-Type": "application/json",
    Authorization: "Client-ID b067d5cb828ec5a"
  },
  redirect: "follow",
  referrerPolicy: "no-referrer"
}
