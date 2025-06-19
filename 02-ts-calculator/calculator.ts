function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number | string {
  return b === 0 ? "Cannot divide by zero" : a / b;
}

// Example usage
console.log("Add:", add(4, 5));
console.log("Subtract:", subtract(10, 3));
console.log("Multiply:", multiply(6, 7));
console.log("Divide:", divide(8, 2));
