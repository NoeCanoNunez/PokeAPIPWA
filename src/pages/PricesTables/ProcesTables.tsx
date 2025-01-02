import { useState } from 'react';
import * as XLSX from 'xlsx';
import { ExcelData, SheetData } from './Excel';

export const ProcesTables: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelData>({
    sheets: [],
    currentSheet: 0
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = XLSX.read(event.target?.result, { type: 'binary' });
        const sheets: SheetData[] = [];

        wb.SheetNames.forEach((sheetName) => {
          const ws = wb.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(ws);
          sheets.push({ name: sheetName, data });
        });

        setExcelData({ sheets, currentSheet: 0 });
      };
      reader.readAsBinaryString(file);
    }
  };

  const changeSheet = (index: number) => {
    setExcelData(prev => ({ ...prev, currentSheet: index }));
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".xlsx,.xls" 
        onChange={handleFileUpload}
      />
      
      {excelData.sheets.length > 0 && (
        <div>
          <div>
            {excelData.sheets.map((sheet, index) => (
              <button 
                key={sheet.name}
                onClick={() => changeSheet(index)}
                style={{ 
                  fontWeight: index === excelData.currentSheet ? 'bold' : 'normal' 
                }}
              >
                {sheet.name}
              </button>
            ))}
          </div>
          
          <table>
            <thead>
              {excelData.sheets[excelData.currentSheet].data.length > 0 && (
                <tr>
                  {Object.keys(excelData.sheets[excelData.currentSheet].data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {excelData.sheets[excelData.currentSheet].data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell as string}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
