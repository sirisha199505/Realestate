// ── Plot layout data — based on ABIVYA GROUP DTCP APPROVED LAYOUT
// Plan in Sy.No. 65/P of Venkatapur Grampanchayat, Kohir Mandal, Sangareddy District
// LP No. 102/2025/H  |  Total Plots: 96

export const PLOTS_VERSION = 3; // bump this to force a localStorage reset

export const blocks = [
  { id: 'A', label: 'Block A', description: 'Upper Diagonal Section',      road: "40' CC Road" },
  { id: 'B', label: 'Block B', description: 'Upper Middle Section',         road: "40' CC Road" },
  { id: 'C', label: 'Block C', description: 'Central Grid Section',         road: "33' CC Road" },
  { id: 'D', label: 'Block D', description: 'Premium Corner — Beside NIMZ', road: "40' CC Road" },
  { id: 'E', label: 'Block E', description: 'Lower Right Section',          road: "33' CC Road" },
];

function makePlot(plotNo, seqNo, block, facing, w, d) {
  return {
    id: `${block}-${plotNo}`,
    plotNo,
    seqNo,
    block,
    facing,
    width: w,
    depth: d,
    area: Math.round((w * d) / 9),
    status: 'available',
    bookedBy: null,
  };
}

// ── Block A — plots 1–18 (seqNo 1–18)
const blockA = [
  makePlot(1,  1,  'A', 'East', 36, 40),
  makePlot(2,  2,  'A', 'East', 36, 40),
  makePlot(3,  3,  'A', 'East', 36, 45),
  makePlot(4,  4,  'A', 'East', 38, 45),
  makePlot(5,  5,  'A', 'East', 38, 45),
  makePlot(6,  6,  'A', 'East', 40, 45),
  makePlot(7,  7,  'A', 'East', 40, 45),
  makePlot(8,  8,  'A', 'East', 42, 45),
  makePlot(9,  9,  'A', 'East', 42, 50),
  makePlot(10, 10, 'A', 'West', 40, 45),
  makePlot(11, 11, 'A', 'West', 40, 45),
  makePlot(12, 12, 'A', 'West', 42, 45),
  makePlot(13, 13, 'A', 'West', 42, 50),
  makePlot(14, 14, 'A', 'West', 45, 50),
  makePlot(15, 15, 'A', 'West', 45, 50),
  makePlot(16, 16, 'A', 'West', 47, 50),
  makePlot(17, 17, 'A', 'West', 47, 55),
  makePlot(18, 18, 'A', 'West', 50, 55),
];

// ── Block B — plots 1–16 (seqNo 19–34)
const blockB = [
  makePlot(1,  19, 'B', 'South', 40, 45),
  makePlot(2,  20, 'B', 'South', 40, 45),
  makePlot(3,  21, 'B', 'South', 40, 45),
  makePlot(4,  22, 'B', 'South', 40, 45),
  makePlot(5,  23, 'B', 'South', 42, 45),
  makePlot(6,  24, 'B', 'South', 42, 45),
  makePlot(7,  25, 'B', 'South', 42, 45),
  makePlot(8,  26, 'B', 'South', 42, 45),
  makePlot(9,  27, 'B', 'South', 45, 45),
  makePlot(10, 28, 'B', 'South', 45, 45),
  makePlot(11, 29, 'B', 'South', 45, 50),
  makePlot(12, 30, 'B', 'South', 45, 50),
  makePlot(13, 31, 'B', 'South', 45, 50),
  makePlot(14, 32, 'B', 'South', 48, 50),
  makePlot(15, 33, 'B', 'South', 48, 50),
  makePlot(16, 34, 'B', 'South', 50, 50),
];

// ── Block C — plots 1–25 (seqNo 35–59)
const blockC = [
  makePlot(1,  35, 'C', 'East', 36, 40),
  makePlot(2,  36, 'C', 'East', 36, 40),
  makePlot(3,  37, 'C', 'East', 36, 40),
  makePlot(4,  38, 'C', 'East', 36, 40),
  makePlot(5,  39, 'C', 'East', 38, 45),
  makePlot(6,  40, 'C', 'East', 38, 45),
  makePlot(7,  41, 'C', 'East', 38, 45),
  makePlot(8,  42, 'C', 'East', 40, 45),
  makePlot(9,  43, 'C', 'East', 40, 45),
  makePlot(10, 44, 'C', 'East', 40, 45),
  makePlot(11, 45, 'C', 'East', 40, 45),
  makePlot(12, 46, 'C', 'East', 40, 50),
  makePlot(13, 47, 'C', 'West', 36, 40),
  makePlot(14, 48, 'C', 'West', 36, 40),
  makePlot(15, 49, 'C', 'West', 36, 40),
  makePlot(16, 50, 'C', 'West', 36, 40),
  makePlot(17, 51, 'C', 'West', 38, 45),
  makePlot(18, 52, 'C', 'West', 38, 45),
  makePlot(19, 53, 'C', 'West', 40, 45),
  makePlot(20, 54, 'C', 'West', 40, 45),
  makePlot(21, 55, 'C', 'West', 40, 45),
  makePlot(22, 56, 'C', 'West', 40, 45),
  makePlot(23, 57, 'C', 'West', 42, 50),
  makePlot(24, 58, 'C', 'West', 42, 50),
  makePlot(25, 59, 'C', 'West', 42, 50),
];

// ── Block D — plots 1–12 (seqNo 60–71)
const blockD = [
  makePlot(1,  60, 'D', 'East', 40, 90),
  makePlot(2,  61, 'D', 'East', 40, 90),
  makePlot(3,  62, 'D', 'East', 40, 85),
  makePlot(4,  63, 'D', 'East', 40, 80),
  makePlot(5,  64, 'D', 'East', 42, 75),
  makePlot(6,  65, 'D', 'East', 42, 75),
  makePlot(7,  66, 'D', 'East', 42, 70),
  makePlot(8,  67, 'D', 'East', 45, 70),
  makePlot(9,  68, 'D', 'East', 45, 65),
  makePlot(10, 69, 'D', 'East', 45, 65),
  makePlot(11, 70, 'D', 'East', 47, 60),
  makePlot(12, 71, 'D', 'East', 47, 60),
];

// ── Block E — plots 1–25 (seqNo 72–96)
const blockE = [
  makePlot(1,  72, 'E', 'South', 35, 40),
  makePlot(2,  73, 'E', 'South', 35, 40),
  makePlot(3,  74, 'E', 'South', 36, 40),
  makePlot(4,  75, 'E', 'South', 36, 40),
  makePlot(5,  76, 'E', 'South', 36, 42),
  makePlot(6,  77, 'E', 'South', 36, 42),
  makePlot(7,  78, 'E', 'South', 38, 42),
  makePlot(8,  79, 'E', 'South', 38, 45),
  makePlot(9,  80, 'E', 'South', 38, 45),
  makePlot(10, 81, 'E', 'South', 40, 45),
  makePlot(11, 82, 'E', 'South', 40, 45),
  makePlot(12, 83, 'E', 'North', 35, 40),
  makePlot(13, 84, 'E', 'North', 35, 40),
  makePlot(14, 85, 'E', 'North', 36, 40),
  makePlot(15, 86, 'E', 'North', 36, 40),
  makePlot(16, 87, 'E', 'North', 36, 42),
  makePlot(17, 88, 'E', 'North', 38, 42),
  makePlot(18, 89, 'E', 'North', 38, 42),
  makePlot(19, 90, 'E', 'North', 38, 45),
  makePlot(20, 91, 'E', 'North', 40, 45),
  makePlot(21, 92, 'E', 'North', 40, 45),
  makePlot(22, 93, 'E', 'North', 42, 45),
  makePlot(23, 94, 'E', 'North', 42, 48),
  makePlot(24, 95, 'E', 'North', 45, 48),
  makePlot(25, 96, 'E', 'North', 45, 50),
];

export const allPlots = [...blockA, ...blockB, ...blockC, ...blockD, ...blockE];
// Total: 18 + 16 + 25 + 12 + 25 = 96 plots — ALL AVAILABLE

export const STATUS = {
  available: { label: 'Available', bg: 'bg-green-500/80',  border: 'border-green-400',  text: 'text-green-400',  fill: '#22c55e', stroke: '#16a34a' },
  booked:    { label: 'Booked',    bg: 'bg-yellow-500/80', border: 'border-yellow-400', text: 'text-yellow-400', fill: '#eab308', stroke: '#ca8a04' },
  sold:      { label: 'Sold',      bg: 'bg-red-500/80',    border: 'border-red-400',    text: 'text-red-400',    fill: '#ef4444', stroke: '#dc2626' },
};
