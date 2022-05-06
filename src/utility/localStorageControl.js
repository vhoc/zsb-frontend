const getItem = key => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const removeItem = key => {
  localStorage.removeItem(key);
};

const getItemSessionStorage = key => {
  const data = typeof window !== 'undefined' ? sessionStorage.getItem(key) : '';

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItemSessionStorage = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return sessionStorage.setItem(key, stringify);
};

const removeItemSessionStorage = key => {
  sessionStorage.removeItem(key);
};

export { 
  getItem, 
  setItem, 
  removeItem,
  getItemSessionStorage,
  setItemSessionStorage,
  removeItemSessionStorage
};
