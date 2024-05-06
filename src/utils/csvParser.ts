import fs from "fs";
import csv from "csv-parser";

export class CsvParser {
  static async parse(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data: any) => {
          const formattedData: any = {};
          let isFirstKey = true;
          for (const key in data) {
            if (data.hasOwnProperty(key) && data[key]) {
              // Виправляємо значення першого ключа та видаляємо апострофи з ключів
              const formattedKey = isFirstKey ? "Name" : key.replace(/'/g, "");
              formattedData[formattedKey] = data[key];
              isFirstKey = false;
            }
          }

          if (Object.keys(formattedData).length > 0) {
            results.push(formattedData);
          }
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error: any) => {
          reject(error);
        });
    });
  }
}
