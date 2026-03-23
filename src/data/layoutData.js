// ── Plot layout data — based on ABIVYA GROUP DTCP APPROVED LAYOUT
// Plan in Sy.No. 65/P of Venkatapur Grampanchayat, Kohir Mandal, Sangareddy District
// LP No. 102/2025/H

export const blocks = [
  {
    id: 'A',
    label: 'Block A',
    description: 'Upper Diagonal Section — Near Mumbai Highway',
    road: "40' CC Road",
  },
  {
    id: 'B',
    label: 'Block B',
    description: 'Upper Middle Section',
    road: "40' CC Road",
  },
  {
    id: 'C',
    label: 'Block C',
    description: 'Central Grid Section',
    road: "33' CC Road",
  },
  {
    id: 'D',
    label: 'Block D',
    description: 'Premium Corner Section — Beside NIMZ',
    road: "40' CC Road",
  },
  {
    id: 'E',
    label: 'Block E',
    description: 'Lower Right Section',
    road: "33' CC Road",
  },
];

// Each plot: { id, plotNo, block, facing, width, depth, area, status, bookedBy }
// area in sq yards; status: 'available' | 'booked' | 'sold'
function makePlot(plotNo, block, facing, w, d, status = 'available') {
  return {
    id: `${block}-${plotNo}`,
    plotNo,
    block,
    facing,
    width: w,
    depth: d,
    area: Math.round((w * d) / 9), // sq yards approx
    status,
    bookedBy: null,
  };
}

// ── Block A — 14 plots, upper diagonal, facing EAST/WEST
const blockA = [
  makePlot(1,  'A', 'East', 36, 40),
  makePlot(2,  'A', 'East', 36, 40),
  makePlot(3,  'A', 'East', 36, 45),
  makePlot(4,  'A', 'East', 38, 45),
  makePlot(5,  'A', 'East', 38, 45),
  makePlot(6,  'A', 'East', 40, 45),
  makePlot(7,  'A', 'West', 40, 45),
  makePlot(8,  'A', 'West', 42, 45),
  makePlot(9,  'A', 'West', 42, 50),
  makePlot(10, 'A', 'West', 45, 50),
  makePlot(11, 'A', 'West', 45, 50),
  makePlot(12, 'A', 'West', 47, 50),
  makePlot(13, 'A', 'West', 47, 55),
  makePlot(14, 'A', 'West', 50, 55),
];

// ── Block B — 12 plots, upper-middle row
const blockB = [
  makePlot(1,  'B', 'South', 40, 45),
  makePlot(2,  'B', 'South', 40, 45),
  makePlot(3,  'B', 'South', 40, 45),
  makePlot(4,  'B', 'South', 42, 45),
  makePlot(5,  'B', 'South', 42, 45),
  makePlot(6,  'B', 'South', 42, 45),
  makePlot(7,  'B', 'South', 42, 45, 'booked'),
  makePlot(8,  'B', 'South', 45, 45),
  makePlot(9,  'B', 'South', 45, 50),
  makePlot(10, 'B', 'South', 45, 50, 'booked'),
  makePlot(11, 'B', 'South', 45, 50),
  makePlot(12, 'B', 'South', 50, 50),
];

// ── Block C — 20 plots, central grid, facing East/West
const blockC = [
  makePlot(1,  'C', 'East', 36, 40),
  makePlot(2,  'C', 'East', 36, 40),
  makePlot(3,  'C', 'East', 36, 40),
  makePlot(4,  'C', 'East', 38, 45),
  makePlot(5,  'C', 'East', 38, 45, 'sold'),
  makePlot(6,  'C', 'East', 38, 45),
  makePlot(7,  'C', 'East', 40, 45),
  makePlot(8,  'C', 'East', 40, 45),
  makePlot(9,  'C', 'East', 40, 45),
  makePlot(10, 'C', 'East', 40, 50),
  makePlot(11, 'C', 'West', 36, 40),
  makePlot(12, 'C', 'West', 36, 40),
  makePlot(13, 'C', 'West', 36, 40, 'booked'),
  makePlot(14, 'C', 'West', 38, 45),
  makePlot(15, 'C', 'West', 38, 45),
  makePlot(16, 'C', 'West', 40, 45),
  makePlot(17, 'C', 'West', 40, 45, 'sold'),
  makePlot(18, 'C', 'West', 40, 45),
  makePlot(19, 'C', 'West', 42, 50),
  makePlot(20, 'C', 'West', 42, 50),
];

// ── Block D — 8 large premium plots beside NIMZ
const blockD = [
  makePlot(1,  'D', 'East', 40, 90,  'available'),
  makePlot(2,  'D', 'East', 40, 90,  'booked'),
  makePlot(3,  'D', 'East', 40, 85,  'available'),
  makePlot(4,  'D', 'East', 40, 80,  'sold'),
  makePlot(5,  'D', 'East', 42, 75,  'available'),
  makePlot(6,  'D', 'East', 42, 75,  'available'),
  makePlot(7,  'D', 'East', 45, 70,  'available'),
  makePlot(8,  'D', 'East', 45, 65,  'available'),
];

// ── Block E — 18 plots, lower-right section
const blockE = [
  makePlot(1,  'E', 'South', 35, 40),
  makePlot(2,  'E', 'South', 35, 40),
  makePlot(3,  'E', 'South', 36, 40),
  makePlot(4,  'E', 'South', 36, 42),
  makePlot(5,  'E', 'South', 36, 42),
  makePlot(6,  'E', 'South', 38, 42, 'booked'),
  makePlot(7,  'E', 'South', 38, 45),
  makePlot(8,  'E', 'South', 38, 45),
  makePlot(9,  'E', 'South', 40, 45, 'sold'),
  makePlot(10, 'E', 'North', 35, 40),
  makePlot(11, 'E', 'North', 35, 40),
  makePlot(12, 'E', 'North', 36, 40),
  makePlot(13, 'E', 'North', 36, 42),
  makePlot(14, 'E', 'North', 36, 42),
  makePlot(15, 'E', 'North', 38, 42),
  makePlot(16, 'E', 'North', 38, 45),
  makePlot(17, 'E', 'North', 40, 45, 'booked'),
  makePlot(18, 'E', 'North', 42, 45),
];

export const allPlots = [...blockA, ...blockB, ...blockC, ...blockD, ...blockE];

export const STATUS = {
  available: { label: 'Available',  bg: 'bg-green-500/80',   border: 'border-green-400',  text: 'text-green-400',  fill: '#22c55e', stroke: '#16a34a' },
  booked:    { label: 'Booked',     bg: 'bg-yellow-500/80',  border: 'border-yellow-400', text: 'text-yellow-400', fill: '#eab308', stroke: '#ca8a04' },
  sold:      { label: 'Sold',       bg: 'bg-red-500/80',     border: 'border-red-400',    text: 'text-red-400',    fill: '#ef4444', stroke: '#dc2626' },
};
