import fs from 'fs';
import path from 'path';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export interface SignupData {
  id: string;
  name: string;
  email: string;
  ageRange: string;
  gender: string;
  lookingFor: string;
  city: string;
  timestamp: string;
}

// In-memory cache to preserve state between warm serverless function invocations on Vercel
let inMemorySignups: SignupData[] = [];
let hasLoadedInMemory = false;
let sqliteDb: Database | null = null;
let useSQLite = true;

// Determine storage paths based on environment
const getDbPath = (): string => {
  if (process.env.VERCEL === '1') {
    return path.join('/tmp', 'waitlist.db');
  }
  return path.join(process.cwd(), 'data', 'waitlist.db');
};

const getJsonPath = (): string => {
  if (process.env.VERCEL === '1') {
    return path.join('/tmp', 'signups.json');
  }
  return path.join(process.cwd(), 'data', 'signups.json');
};

// Initialize SQLite database
const initSQLite = async (): Promise<Database> => {
  if (sqliteDb) return sqliteDb;

  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      ageRange TEXT NOT NULL,
      gender TEXT,
      lookingFor TEXT,
      city TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  sqliteDb = db;
  return db;
};

// JSON storage fallback functions
const initJsonFile = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
};

const getSignupsJson = async (): Promise<SignupData[]> => {
  const filePath = getJsonPath();
  try {
    initJsonFile(filePath);
    const data = fs.readFileSync(filePath, 'utf8');
    const signups = JSON.parse(data) as SignupData[];
    
    if (!hasLoadedInMemory) {
      inMemorySignups = signups;
      hasLoadedInMemory = true;
    } else {
      const merged = [...inMemorySignups];
      signups.forEach(s => {
        if (!merged.some(m => m.email.toLowerCase() === s.email.toLowerCase())) {
          merged.push(s);
        }
      });
      inMemorySignups = merged;
    }
    return inMemorySignups;
  } catch (e) {
    console.error('Failed to read signups from JSON storage, falling back to memory:', e);
    return inMemorySignups;
  }
};

const addSignupJson = async (
  data: Omit<SignupData, 'id' | 'timestamp'>
): Promise<{ signup: SignupData; ticketNum: number }> => {
  const signups = await getSignupsJson();

  // Prevent duplicate email check
  const duplicate = signups.find(s => s.email.toLowerCase() === data.email.toLowerCase());
  if (duplicate) {
    const ticketNum = 942 + signups.findIndex(s => s.email.toLowerCase() === data.email.toLowerCase()) + 1;
    return { signup: duplicate, ticketNum };
  }

  const newSignup: SignupData = {
    id: Math.random().toString(36).substring(2, 9),
    name: data.name.trim(),
    email: data.email.trim(),
    ageRange: data.ageRange,
    gender: data.gender,
    lookingFor: data.lookingFor,
    city: data.city.trim(),
    timestamp: new Date().toLocaleString(),
  };

  signups.push(newSignup);
  inMemorySignups = signups;
  
  const ticketNum = 942 + signups.length;
  const filePath = getJsonPath();

  try {
    initJsonFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify(signups, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write signup to JSON file:', e);
  }

  return { signup: newSignup, ticketNum };
};

const clearSignupsJson = async (): Promise<void> => {
  inMemorySignups = [];
  hasLoadedInMemory = true;
  const filePath = getJsonPath();
  try {
    initJsonFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to clear JSON storage file:', e);
  }
};

// Exported high-level storage functions supporting SQLite with JSON fallback
export async function getSignups(): Promise<SignupData[]> {
  if (useSQLite) {
    try {
      const db = await initSQLite();
      const rows = await db.all<SignupData[]>('SELECT * FROM waitlist ORDER BY timestamp ASC');
      return rows;
    } catch (e) {
      console.warn('SQLite failed to get signups, falling back to JSON storage:', e);
      useSQLite = false; // Disable SQLite for subsequent calls
    }
  }
  return getSignupsJson();
}

export async function addSignup(
  data: Omit<SignupData, 'id' | 'timestamp'>
): Promise<{ signup: SignupData; ticketNum: number }> {
  if (useSQLite) {
    try {
      const db = await initSQLite();
      
      // Check duplicate
      const duplicate = await db.get<SignupData>('SELECT * FROM waitlist WHERE LOWER(email) = ?', [data.email.toLowerCase()]);
      if (duplicate) {
        // Find ticket index by counting rows before this entry
        const countBefore = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM waitlist WHERE timestamp < ?', [duplicate.timestamp]);
        const ticketNum = 942 + (countBefore?.count || 0) + 1;
        return { signup: duplicate, ticketNum };
      }

      const id = Math.random().toString(36).substring(2, 9);
      const timestamp = new Date().toLocaleString();
      const newSignup: SignupData = {
        id,
        name: data.name.trim(),
        email: data.email.trim(),
        ageRange: data.ageRange,
        gender: data.gender,
        lookingFor: data.lookingFor,
        city: data.city.trim(),
        timestamp,
      };

      await db.run(
        'INSERT INTO waitlist (id, name, email, ageRange, gender, lookingFor, city, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, newSignup.name, newSignup.email, newSignup.ageRange, newSignup.gender, newSignup.lookingFor, newSignup.city, timestamp]
      );

      const totalCount = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM waitlist');
      const ticketNum = 942 + (totalCount?.count || 1);

      return { signup: newSignup, ticketNum };
    } catch (e) {
      console.warn('SQLite failed to add signup, falling back to JSON storage:', e);
      useSQLite = false;
    }
  }
  return addSignupJson(data);
}

export async function clearSignups(): Promise<void> {
  if (useSQLite) {
    try {
      const db = await initSQLite();
      await db.run('DELETE FROM waitlist');
      return;
    } catch (e) {
      console.warn('SQLite failed to clear signups, falling back to JSON storage:', e);
      useSQLite = false;
    }
  }
  await clearSignupsJson();
}
