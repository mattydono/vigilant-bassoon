type Persistable = { id: string | number };

export interface PersistenceService<T extends Persistable> {
  save(payload: T): Promise<boolean>;

  getAll(): Promise<T[]>;

  read(id: string): Promise<T | null>;

  remove(id: string): Promise<boolean>;
}

export function createPersistenceService<T extends Persistable>(
  key: string,
): PersistenceService<T> {
  return {
    save: payload => save(key, payload),
    getAll: () => getAll(key),
    read: id => read(key, id),
    remove: id => remove(key, id),
  };
}

async function save<T extends Persistable>(key: string, value: T): Promise<boolean> {
  try {
    // await new Promise(resolve => window.setTimeout(resolve, 5000));
    const storedValue = localStorage.getItem(key);
    const prevValue = storedValue ? JSON.parse(storedValue) : [];
    const newValue = [...prevValue, value];
    localStorage.setItem(key, JSON.stringify(newValue));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getAll<T extends Persistable>(key: string): Promise<T[]> {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
}

async function read<T extends Persistable>(key: string, id: string | number): Promise<T | null> {
  const all = await getAll<T>(key);
  return all.find(item => item.id === id) || null;
}

async function remove<T extends Persistable>(key: string, id: string | number): Promise<boolean> {
  try {
    const all = await getAll<T>(key);
    const tIdx = all.findIndex(item => item.id === id);
    const newAll = [...all];
    newAll.splice(tIdx, 1);
    localStorage.setItem(key, JSON.stringify(newAll));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
