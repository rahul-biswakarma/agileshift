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

export const getNoOfDays = (dateOfCreation:Date):number=>{
  const creationDate = new Date(dateOfCreation)
  let today = new Date();
  let diff = Math.abs(today.getTime() - creationDate.getTime());
  
  let diffDays = Math.floor(diff / (1000 * 3600 * 24));
  
  return diffDays;
}