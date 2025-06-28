function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer Function: ' + outerVariable);
    console.log('Inner Function: ' + innerVariable);
  };
}

const newFunction = outerFunction('outside');
newFunction('inside');
