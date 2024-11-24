const storagePrefix = "nibay__";

type Token = {
  accessToken: string;
};

const storage = {
  getToken: () => {
    return JSON.parse(localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: ({ accessToken }: Token) => {
    localStorage.setItem(`${storagePrefix}token`, JSON.stringify(accessToken));
  },
  clearToken: () => {
    localStorage.removeItem(`${storagePrefix}token`);
  }
};

export default storage;
