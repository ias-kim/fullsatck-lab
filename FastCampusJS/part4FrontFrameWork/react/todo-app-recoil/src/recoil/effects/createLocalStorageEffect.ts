export const createLocalStorageEffect = (key: string, value: unknown) => {
  return ({ setSelf, onSet }) => {
    setSelf(JSON.parse(localStorage.getItem(key) || JSON.stringify(value)));
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
        return;
      }
      localStorage.setItem(key, JSON.stringify(newValue));
      console.log(newValue, _);
    });
  };
};
