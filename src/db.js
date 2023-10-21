import fs from 'node:fs/promises'

const DB_PATH = new URL('./db.json', import.meta.url).pathname;

export const getDB = async () => {
    try {
        const db = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(db)
    } catch (error) {
        console.error("An error has occurred while reading or parsing the database:", error)
        return null;
    }

};

export const saveDB = async (db) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
        return db
    } catch (error) {
        console.error("An error has occurred while writing to the database:", error)
    }
}

export const insertDB = async (note) =>{
    const db = getDB()
    db.notes.push(note)
    await saveDB(db)
    return note
}