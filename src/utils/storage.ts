enum Storage {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

const storage = {
  get: (key: string): string | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export { storage, Storage };
