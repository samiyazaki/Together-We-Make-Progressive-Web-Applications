import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// puts the content into the database
export const putDb = async (content) => {
  console.log("Putting content into the database");
  const contactDb = await openDB("jate", 1);
  const tx = contactDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ value: content });
  const result = await request;

  console.log("Content added to the database", result);
};
// gets the content from the database
export const getDb = async () => {
  console.log("Getting content from the database");
  const contactDb = await openDB("jate", 1);
  const tx = contactDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("Content retrieved from the database", result);
  return result?.[0]?.value;
};
initdb();
