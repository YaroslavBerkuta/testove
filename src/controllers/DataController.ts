import { Request, Response } from "express";
import multer from "multer";
import { DataModel } from "../models/DataModel";
import { CsvParser } from "../utils/csvParser";

export const upload = multer({ dest: "uploads/" });

export class DataController {
  static async uploadCSV(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      await DataModel.deleteMany({});

      const results = await CsvParser.parse(file.path);
      const transformedResults = results.map((item: any) => ({
        name: item["Name"],
        age: item["Age"],
        city: item["City"],
      }));

      await DataModel.create(transformedResults);

      res.json({ message: "Data uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getData(req: Request, res: Response) {
    try {
      const data = await DataModel.find({});
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
