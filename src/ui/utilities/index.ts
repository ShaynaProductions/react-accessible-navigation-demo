export * from "./constants";
export * from "./returnTrueElementOrUndefined";

export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};

export const safeEventHandlerCall = (fn, arg) =>
  typeof fn === "function" ? fn(arg) : fn;
