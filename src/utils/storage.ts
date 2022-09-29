enum Storage {
  AccessToken = 'accessToken',
}

const storage = {
  get: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : '';
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export { storage, Storage };
