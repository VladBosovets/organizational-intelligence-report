import { jsPDF } from 'jspdf';
import { formatCurrency, formatNumber } from './formatters';

/**
 * Exports the analysis report as a PDF (simplified version without autoTable)
 * @param {Object} data - Analysis data
 * @param {string} filename - Output filename
 */
export function exportToPDF(data, filename = 'organizational-intelligence-report.pdf') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let yPos = 20;

  // IBM Colors
  const ibmBlue = [15, 98, 254];
  const ibmGray = [57, 57, 57];

  // Helper to add new page if needed
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPos + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Helper to draw a box
  const drawBox = (x, y, width, height, fillColor) => {
    doc.setFillColor(...fillColor);
    doc.rect(x, y, width, height, 'F');
  };

  // Header
  drawBox(0, 0, pageWidth, 40, ibmBlue);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Organizational Intelligence Report', pageWidth / 2, 25, { align: 'center' });
  
  yPos = 50;

  // Date
  doc.setTextColor(...ibmGray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const date = new Date(data.metadata.analysis_date).toLocaleDateString();
  doc.text(`Generated: ${date}`, margin, yPos);
  yPos += 15;

  // Executive Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Executive Summary', margin, yPos);
  yPos += 10;

  // Key Metrics Box
  drawBox(margin, yPos, pageWidth - 2 * margin, 40, [240, 240, 240]);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmGray);
  doc.text('Total Annual Savings:', margin + 5, yPos + 10);
  doc.setTextColor(...ibmBlue);
  doc.setFontSize(16);
  doc.text(formatCurrency(data.executive_summary.total_savings_annual), margin + 5, yPos + 20);
  
  doc.setFontSize(10);
  doc.setTextColor(...ibmGray);
  doc.setFont('helvetica', 'bold');
  doc.text(`ROI: ${data.executive_summary.roi}x`, margin + 80, yPos + 10);
  doc.text(`Payback: ${data.executive_summary.payback_months} months`, margin + 80, yPos + 20);
  
  yPos += 50;

  // Repositories Analyzed
  checkPageBreak(30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Repositories Analyzed', margin, yPos);
  yPos += 8;

  data.metadata.repositories.forEach((repo, index) => {
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ibmGray);
    doc.text(`${index + 1}. ${repo.name}`, margin + 5, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`   ${repo.url}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`   Files: ${formatNumber(repo.files_analyzed)} | Language: ${repo.language}`, margin + 5, yPos);
    yPos += 10;
  });

  // Key Findings
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Key Findings', margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...ibmGray);
  
  data.executive_summary.key_findings.forEach((finding, index) => {
    checkPageBreak(15);
    const lines = doc.splitTextToSize(`• ${finding}`, pageWidth - 2 * margin - 5);
    lines.forEach(line => {
      doc.text(line, margin + 5, yPos);
      yPos += 6;
    });
    yPos += 3;
  });

  // Quick Wins
  checkPageBreak(50);
  yPos += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Quick Wins - Top Recommendations', margin, yPos);
  yPos += 10;

  data.executive_summary.quick_wins.forEach((qw, index) => {
    checkPageBreak(25);
    drawBox(margin, yPos, pageWidth - 2 * margin, 20, [245, 245, 245]);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ibmGray);
    doc.text(`${index + 1}. ${qw.title}`, margin + 3, yPos + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Effort: ${qw.effort_weeks} weeks | Cost: ${formatCurrency(qw.implementation_cost)}`, margin + 3, yPos + 12);
    doc.setTextColor(...ibmBlue);
    doc.text(`Savings: ${formatCurrency(qw.savings_annual)}/year | ROI: ${qw.roi}x`, margin + 3, yPos + 17);
    
    yPos += 25;
  });

  // Developer Risk Summary
  checkPageBreak(50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Developer Risk Analysis', margin, yPos);
  yPos += 10;

  data.developer_risk.cross_repo_critical_developers.slice(0, 5).forEach((dev, index) => {
    checkPageBreak(20);
    drawBox(margin, yPos, pageWidth - 2 * margin, 16, [250, 240, 240]);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ibmGray);
    doc.text(dev.developer, margin + 3, yPos + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Risk Score: ${dev.risk_score} | Critical Files: ${dev.critical_files.length}`, margin + 3, yPos + 11);
    doc.setTextColor([218, 30, 40]);
    doc.text(`Impact if Lost: ${formatCurrency(dev.impact_if_lost.cost_usd)}`, margin + 100, yPos + 11);
    
    yPos += 20;
  });

  // Code Duplication
  checkPageBreak(50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ibmBlue);
  doc.text('Code Duplication Analysis', margin, yPos);
  yPos += 10;

  data.efficiency_analysis.code_duplication.forEach((dup, index) => {
    checkPageBreak(18);
    drawBox(margin, yPos, pageWidth - 2 * margin, 14, [255, 250, 240]);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ibmGray);
    doc.text(dup.category.replace(/_/g, ' ').toUpperCase(), margin + 3, yPos + 5);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Similarity: ${(dup.similarity_score * 100).toFixed(0)}% | Lines: ${dup.duplicate_lines}`, margin + 3, yPos + 10);
    doc.setTextColor([241, 194, 27]);
    doc.text(`Annual Waste: ${formatCurrency(dup.cost_analysis.total_waste_annual)}`, margin + 100, yPos + 10);
    
    yPos += 18;
  });

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | Generated by Organizational Intelligence Report Tool`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(filename);
}

/**
 * Generates a shareable report URL (simulated)
 * @param {Object} data - Analysis data
 * @returns {string} Shareable URL
 */
export function generateShareableLink(data) {
  const reportId = btoa(Date.now().toString()).substring(0, 8);
  const baseUrl = window.location.origin;
  return `${baseUrl}/shared/${reportId}`;
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// Made with Bob