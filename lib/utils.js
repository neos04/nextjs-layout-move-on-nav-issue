import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Convert Timestamp to Local Timestamp
export function convertUtcTimestampToLocal(timestamp) {
  const utcTimestamp = new Date(timestamp);
  const localTimestamp = utcTimestamp.toLocaleString('en-US', { timeZone: 'America/Grenada' });

  return localTimestamp;
}

// Convert an Object of CSV String(s) to an Array List
export function getArrayValuesFromCSVObject(obj) {
  let values = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const valuesArray = obj[key].split(',').map(item => item.trim());
      values = values.concat(valuesArray);
    }
  }
  return values;
}

// Convert Comma Seperate String To Array
export function csvStringToArray(str) {
  return str.split(',').map(item => item.trim());
}

// Get Specific Key from an array of objects and store it in an array
export function extractKeyFromArray(array, key) {
  return array.map(obj => obj[key]);
}

export function getInitials(name) {
  return name.trim().split(' ')
    .map(part => part[0]?.toUpperCase())
    .join('');
}
