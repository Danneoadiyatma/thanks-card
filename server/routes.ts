import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLetterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all letters
  app.get("/api/letters", async (req, res) => {
    try {
      const letters = await storage.getAllLetters();
      res.json(letters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch letters" });
    }
  });

  // Get single letter
  app.get("/api/letters/:id", async (req, res) => {
    try {
      const letter = await storage.getLetter(req.params.id);
      if (!letter) {
        return res.status(404).json({ message: "Letter not found" });
      }
      res.json(letter);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch letter" });
    }
  });

  // Create new letter
  app.post("/api/letters", async (req, res) => {
    try {
      const letterData = insertLetterSchema.parse(req.body);
      const letter = await storage.createLetter(letterData);
      res.status(201).json(letter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid letter data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create letter" });
    }
  });

  // Toggle favorite status
  app.patch("/api/letters/:id/favorite", async (req, res) => {
    try {
      const letter = await storage.toggleFavorite(req.params.id);
      if (!letter) {
        return res.status(404).json({ message: "Letter not found" });
      }
      res.json(letter);
    } catch (error) {
      res.status(500).json({ message: "Failed to update letter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
