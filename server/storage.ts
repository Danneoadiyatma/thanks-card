import { type Letter, type InsertLetter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Letter operations
  getAllLetters(): Promise<Letter[]>;
  getLetter(id: string): Promise<Letter | undefined>;
  createLetter(letter: InsertLetter): Promise<Letter>;
  updateLetter(id: string, updates: Partial<Letter>): Promise<Letter | undefined>;
  toggleFavorite(id: string): Promise<Letter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, any>;
  private letters: Map<string, Letter>;

  constructor() {
    this.users = new Map();
    this.letters = new Map();
    
    // Initialize with sample letters
    this.initializeSampleLetters();
  }

  private initializeSampleLetters() {
    const sampleLetters: InsertLetter[] = [
      {
        title: "For bg Epi",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jwdi begini bg...",
        content: `buat kak epi,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/bgepi.jpeg",
        isFavorite: false
      },
      {
        title: "For bg Malvin",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jdi bgini bg...",
        content: `buat kak malvin,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/bgmalvin.jpeg",
        isFavorite: false
      },
      {
        title: "For bg Farrel",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jadi bgini bg...",
        content: `buat kak farrel,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/bgfarrel.jpeg",
        isFavorite: false
      },
      {
        title: "for bg Wilbert",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jadi begini bg...",
        content: `buat kak wilbert,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/bgwilbert.jpeg",
        isFavorite: false
      },
      {
        title: "for kak Kezia",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jadi gini kak...",
        content: `buat kak kezia,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, sampe tepar sakit, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/kakkezia.jpeg",
        isFavorite: false
      },
      {
        title: "For kak Adisty",
        author: "Nyok",
        date: new Date("2025-07-25"),
        preview: "jadi gini kak...",
        content: `buat kak adisty,

thank you bat kak udah ngurusin kita-kita di awal masuk kampus.

tetep sabar ngadepin tingkah laku kita, sampe tepar karena sakit, dan aku gatau mo nulis apa lagi kak. pokok e. terima kasih bat.

aslinya mau ngasih sesuatu buat tanda terima kasih kan, cuma gatau mo ngasih apaan. sama lagi akhir bulan kak, jadi kere.

yah, pokoknya makasih banyak ya kak.

dengan penuh hormat dan rasa terima kasih,
Nyok. btw sorry kak fotonya nguawur. adanya itu`,
        imageUrl: "/kakadisty.jpeg",
        isFavorite: false
      }
    ];

    sampleLetters.forEach(letter => {
      const id = randomUUID();
      const fullLetter: Letter = { 
        ...letter, 
        id,
        imageUrl: letter.imageUrl || null,
        isFavorite: letter.isFavorite ?? false
      };
      this.letters.set(id, fullLetter);
    });
  }

  async getUser(id: string): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = randomUUID();
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllLetters(): Promise<Letter[]> {
    return Array.from(this.letters.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getLetter(id: string): Promise<Letter | undefined> {
    return this.letters.get(id);
  }

  async createLetter(letter: InsertLetter): Promise<Letter> {
    const id = randomUUID();
    const fullLetter: Letter = { ...letter, id };
    this.letters.set(id, fullLetter);
    return fullLetter;
  }

  async updateLetter(id: string, updates: Partial<Letter>): Promise<Letter | undefined> {
    const letter = this.letters.get(id);
    if (!letter) return undefined;
    
    const updatedLetter = { ...letter, ...updates };
    this.letters.set(id, updatedLetter);
    return updatedLetter;
  }

  async toggleFavorite(id: string): Promise<Letter | undefined> {
    const letter = this.letters.get(id);
    if (!letter) return undefined;
    
    const updatedLetter = { ...letter, isFavorite: !letter.isFavorite };
    this.letters.set(id, updatedLetter);
    return updatedLetter;
  }
}

export const storage = new MemStorage();
