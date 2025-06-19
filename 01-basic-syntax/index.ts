// 1. Basic Types
let username : string = "Divyanshi";
let age: number = 22;
let isActive: boolean = true;

// 2. Array and Tuple
let skills: string[] = ["React", "TypeScript", "Node"];
let userTuple: [string, number] = ["Div", 5];

// 3. Union and Intersection Types
type Status = "active" | "inactive";
let accountStatus: Status = "active";

type Developer = {
  name: string;
  skills: string[];
};

type Coder = {
  experience: number;
};

type FullStackDev = Developer & Coder;

const dev: FullStackDev = {
  name: "Divyanshi",
  skills: ["React", "Node", "TS"],
  experience: 1.5,
};

// 4. Function with Types
function greet(user: string): string {
  return `Hello, ${user}!`;
}

function add(a: number, b: number): number {
  return a + b;
}

// 5. Optional and Default Params
function logActivity(activity: string, duration: number = 1): void {
  console.log(`${activity} for ${duration} hour(s)`);
}

logActivity("Learning TS");