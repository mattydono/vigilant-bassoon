type Persistable = { id: string | number };

export interface PersistenceService<T extends Persistable> {
  save(payload: T): void;
  getAll(): T[];
  read(id: string): T | null;
  remove(id: string): void;
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

function save<T extends Persistable>(key: string, value: T): void {
  const storedValue = localStorage.getItem(key);
  const prevValue = storedValue ? JSON.parse(storedValue) : [];
  const newValue = [...prevValue, value];
  localStorage.setItem(key, JSON.stringify(newValue));
}

function getAll<T extends Persistable>(key: string): T[] {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
}

function read<T extends Persistable>(key: string, id: string | number): T | null {
  const all = getAll<T>(key);
  return all.find(item => item.id === id) || null;
}

function remove(key: string, id: string | number): void {
  localStorage.removeItem(key);
}
