import { openDatabase } from 'expo-sqlite';

export const db = openDatabase('database.db');
