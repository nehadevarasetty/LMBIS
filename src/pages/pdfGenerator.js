import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (reportType, data, filters) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text(`${reportType} Report`, 14, 20);

  // Filters
  doc.setFontSize(10);
  const filterText = [
    `Fiscal Year: ${filters.fiscalYear || 'All'}`,
    `Office: ${filters.office || 'All'}`,
    `Ministry: ${filters.ministry || 'All'}`,
    `Date Range: ${filters.dateRange || 'All'}`
  ];
  doc.text(filterText, 14, 30);

  // Table headers based on first object keys
  const keys = data.length > 0 ? Object.keys(data[0]) : [];
  const rows = data.map((item) => keys.map((key) => item[key]));

  if (keys.length > 0) {
    autoTable(doc, {
      head: [keys],
      body: rows,
      startY: 40
    });
  } else {
    doc.text('No data available for this report.', 14, 40);
  }

  // Save
  const fileName = `${reportType.replace(/\s+/g, '_')}_Report.pdf`;
  doc.save(fileName);
};