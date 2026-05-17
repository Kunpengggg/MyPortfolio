const storageKey = "portfolio-lab-snapshots-v1";

export function loadSnapshots() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

export function saveSnapshot(snapshot) {
  const snapshots = loadSnapshots();
  const next = [snapshot, ...snapshots].slice(0, 30);
  localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
}

export function deleteSnapshot(id) {
  const next = loadSnapshots().filter((snapshot) => snapshot.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
}

export function clearSnapshots() {
  localStorage.removeItem(storageKey);
  return [];
}
