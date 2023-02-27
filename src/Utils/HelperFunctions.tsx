export function sortObjectKeysByArrayLength(obj: any) {
  // Get an array of the object's keys
  const keys = Object.keys(obj);
  // Sort the keys by the length of their corresponding value arrays
  keys.sort((a, b) => obj[b].length - obj[a].length);
  if (keys.includes("title")) {
    // Find the index of the element to remove
    const index = keys.indexOf("title");
    // Use splice() to remove the element
    keys.splice(index, 1);
  }
  // Return the sorted keys
  return keys;
}

export const removeDuplicates = (arr: any) => {
  return arr.reduce((unique: any, item: any) => {
    // Check if the current item already exists in the new array
    const index = unique.findIndex(
      (obj: any) =>
        obj.columnName === item.columnName && obj.columnType === item.columnType
    );
    if (index === -1) {
      // If not, add it to the new array
      unique.push(item);
    }
    return unique;
  }, []);
};
