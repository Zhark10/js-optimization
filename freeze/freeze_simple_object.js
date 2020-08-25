"use strict";

const someNestedObj = {
  objTitle: "some nested object",
  firstLevelProperty: {
    secondLevelProperty: 'first value',
  }
};

const frozenObj = Object.freeze(someNestedObj);

// it works! (incorrect freeze)
someNestedObj.firstLevelProperty.secondLevelProperty = "second value";

// this doesn`t work! (correct freeze)
someNestedObj.objTitle = "new object title";
