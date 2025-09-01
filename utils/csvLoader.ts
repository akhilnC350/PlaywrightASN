import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

export interface LoginData {
  Scenario: string;
  username: string;
  password: string;
  expected: string;
  screenshot: string;
}

export function readCSV(filePath: string): LoginData[] {
  const fullPath = path.resolve(__dirname, "..", filePath);
  const content = fs.readFileSync(fullPath, "utf-8");

  return parse(content, {
    columns: true,         // ✅ first row is headers
    skip_empty_lines: true,
    trim: true,
  });
}