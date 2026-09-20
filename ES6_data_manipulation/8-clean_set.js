export default function cleanSet(set, startString) {
  if (!set || !(set instanceof Set) || typeof startString !== 'string' || startString.length === 0) {
    return '';
  }
  const parts = [];
  for (const value of set) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      parts.push(value.slice(startString.length));
    }
  }
  return parts.join('-');
}
