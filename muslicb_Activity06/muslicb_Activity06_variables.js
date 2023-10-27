/*
Benjamin Muslic
Feb 8, 2023
Activity 06 - Variables
*/

// Q1 : Is it permited the next ?
console.log("Q1 ---------------")
var var1 = "Iowa";
console.log(var1);
var var1 = 124;
console.log(var1);
// Is it permited ?
console.log("Yes we can define many times the same variables");

// Q2 : Is it valid ?
console.log("Q2 ----------------");
let var2 = "Ames";
console.log(var2);
var2 = 124;
// Is it valid ?
console.log("No, it does let us define the same variable twice");

// Q3 : Is it valid ?
console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid: yes here it is valid?")

// Q4 : Explain the Error.
console.log("Q4 ----------------");
let var4;
const var5 = 0;
console.log("What's the error : a constant needs to be intiialized")

// Q5 : Explain the Error.
console.log("Q5 ----------------");
const var6 = 3.1415;
//var6 = 2.8;
console.log("What's the error: you can't change const value")

// Q6 : Explain the Error.
let first_name = "Abraham";
console.log("no white space in the variable names");
let numbers = [1,2];
console.log("no numbers at the start of the variable");
let city_state = "Ames Iowa";
console.log("no hyphens allowed");

// Q7 : What !! ??
let mainCity = "DesMoines";
console.log("This is the Capital :", mainCity)
console.log(" ....What's going on ? ....")

// Q8 : "let" and "const" scope vs "var" scope
if (5 === 5) {
    var var7 = 100;
    }
    console.log(var7);
    if (5 === 5) {
    let var8 = 100;
    }
    //console.log(var8);
    console.log("let ");