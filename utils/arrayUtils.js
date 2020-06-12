export const arrayToKeys = (arr) => {
  return arr.reduce(function (acc, curr) {
    acc[curr] = [];
    return acc;
  }, {});
};

export const deleteFromObject = (object, deleteList) => {
  return deleteList.forEach((target) => delete object[target]);
};

export const findSmallestKeyArray = (arr, object) => {
  let lowestCount;
  let smallest;
  arr.forEach((item) => {
    if (object[item] === undefined) return;
    if (lowestCount === undefined || object[item].length < lowestCount) {
      lowestCount = object[item].length;
      smallest = item;
    }
  });
  return smallest;
};

export const groupBy = (array, key, initialObj) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, initialObj);
};

export const shuffleArray = (arr) => {
  // Fisher-Yates Algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};
