import { DEVELOPER_HOURLY_RATE, LINES_PER_HOUR } from './constants';

export const calculateDevelopmentCost = (lines) => {
  const hours = lines / LINES_PER_HOUR;
  return hours * DEVELOPER_HOURLY_RATE;
};

export const calculateMaintenanceCost = (linesPerMonth) => {
  const monthlyHours = linesPerMonth / LINES_PER_HOUR;
  const annualHours = monthlyHours * 12;
  return annualHours * DEVELOPER_HOURLY_RATE;
};

export const calculateROI = (savings, cost) => {
  if (cost === 0) return 0;
  return savings / cost;
};

export const calculatePaybackMonths = (cost, monthlySavings) => {
  if (monthlySavings === 0) return Infinity;
  return cost / monthlySavings;
};

// Made with Bob
