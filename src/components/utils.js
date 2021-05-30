export const currency = "$";

export const ingredientOptions = [
  { value: "salt", label: "Salt" },
  { value: "pepper", label: "Pepper" },
];

export const measurments = [
  { name: "Gr", id: 1 },
  { name: "Ml", id: 2 },
];

export const createMeasurmentOptions = measurments.map((v) => (
  <option value={v.name}>{v.name}</option>
));
