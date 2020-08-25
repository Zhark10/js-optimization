"use strict";

const someNestedObj = {
  objTitle: "some nested object",
  firstLevelProperty: {
    secondLevelProperty: "first value",
  },
};

function deepFreeze(someObject) {
  Object.freeze(someObject);
  if (someObject === undefined) return someObject;

  Object.getOwnPropertyNames(someObject).forEach(function (prop) {
    const propNoNullable = someObject[prop] !== null;
    const correctPropType =
      typeof someObject[prop] === "object" ||
      typeof someObject[prop] === "function";
    const propIsNotFrozen = !Object.isFrozen(someObject[prop]);
    if (propNoNullable && correctPropType && propIsNotFrozen) {
      deepFreeze(someObject[prop]);
    }
  });

  return someObject;
}

const frozenObj = deepFreeze(someNestedObj);

// this doesn`t work! (correct freeze)
someNestedObj.firstLevelProperty.secondLevelProperty = "second value";

// this doesn`t work! (correct freeze)
someNestedObj.objTitle = "new title";
