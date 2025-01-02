export interface SheetData {
  name: string;
  data: any[];
}

export interface ExcelData {
  sheets: SheetData[];
  currentSheet: number;
}
