// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

// @ts-check
// ^^^ enable type checking
/* @ts-nocheck */ // disable checking for file (if globally enabled)

'use strict'

/*
 * PRIMITIVES
 */

/** @type {number} HERE MAY BE AN AUTOCOMPLETE HINT */
let a;
a = 2;

/** @type {string} */
let b = '2';

/** @type {boolean} */
let c = true;

/** @type {number} */
let d = '2'; // error - not number

/** @type {null} */
let e = null;
e = undefined;
e = 0; // error - not null

/** @type {undefined} */
let f;
f = null;
f = undefined;

/** @type {any} */
let g = true; // any type
/** @type {?} */
let h = true;
/** @type {*} */
let i = true;

/** @type {string|number} */
let j = 2;
j = '2';
j = []; // error

/** @type {HTMLElement} */
let k = document.querySelector('div');
k = 0; // error - not HTMLElement


/*
 * ARRAYS
 */

/** @type {Array} */
let arr0 = [1, 2, 3];

/** @type {Array<string>} */ // capital A
let arr1 = [1]; // error - not string

/** @type {string[]} */
let arr2 = [1]; // error - not string

// TUPLES
/** @type {[number, number, string]} */
let arr3 = [2, 2, '2'];
arr3[3] = 2; // error
arr3.push(2); // no error ! 


/*
 * OBJECTS
 */

/** @type {Object} */
let obj0 = 2; // no error! Empty objects are useless

/** @type {{}} */ // another syntax
let obj1 = 2; // no error !

/** @type {{ a:number, b:string }} */
let obj2 = {
    a: 1,
    c: 3  // error - property is not assignable
}

/** @type {{ a:number, b:string }} */
let obj3 = { // Error - missing required property
    a: 1
}

/** @type {{ a:number, b?:string }} */
let obj4 = { // no error - optinal property
    a: 1
}

/** @type {{ a:number, b:string }} */
let obj5 = {
    a: 1,
    b: 2, // type error
    c: 3  // next error ignored !
}

/** @type {{ a:number, b:string }} */
let obj6 = {
    a: 1,
    // @ts-ignore
    b: 2, // ignore error
}

/** @type {Object<string, any>} */ // map-like object <keyType, valueType>
let obj7 = {};
obj7.a = '5';
obj7 = 2; // error - not Object
obj7 = []; // no error
obj7 = null; // no error

/** @type {{[x: string]: number}} */ // another synatx
let obj8 = { a: 'a' }; // error - not number

/** @enum {number} */
let obj9 = {
    a: 2,
    b: '2' // error - not number
}

/** @type {{ a:{x:number}, b:Object<string, number>}} */
let obj10 = {
    a: { x: 11 }, // nested object
    b: { y: 12 }  // nested map-like object
}

/** @type {{a:number} & {[x:string]:any}} */ // open-ended object
let obj11 = {
    z: 2,   // no error
    a: '1'  // error - known fields are type-checked
};


/*
 * TYPEDEFS
 */

/** @typedef {Object<string,string>} myType */
/** @type {myType} */
let obj12 = {};
obj12 = { a: '2' };

/**
* @typedef {Object} myType2 - AUTOCOMPLETE HINT
* @property {number} a
* @property {number} [b] - OPTIONAL (SHOWN AS HINT)
*/
/** @type {myType2} */
let obj13 = {}; // error - empty object
obj13 = { a: 2 };

/**
* @typedef {Object} myType3
* @prop {number} a // shorthand
*/
/** @type {myType3} */
let obj14 = { a: 2 };

/** @type {myType4} */ // error - missing typedef
let obj15 = { a: 2 };

/**
* @typedef {Object} myType5
* @property {number} a
* @property {number} [b]
*/
/**
* @typedef {Object} myType6
* @property {number} c
*/
/** @type {myType5 | myType6} */
let obj16 = { c: 2, b: 2 }; // no error


/*
 * FUNCTIONS
 */

/** @type {Function} */
let func0 = () => { };

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function func1(a, b, c) { // additional argument ignored
    return (a + b).toString(); // error - not number
}
func1(1, '2'); // error - not number
func1(1, 2, 3, 4); // error - aditional argument

/**
 * @param {object} a
 * @param {number} a.b
 */
function func2(a) { }
func2({ b: 3, c: 4 }); // error - property

/** @type {function(number): number} */
function func3(a, b) { // error -^- aditional argumant
    return a + b;
}

/** @type {(a: number) => number} */ // TypeScript syntax
const func4 = (a) => a;

/** @type {function(number): number} */ // Closure syntax
const func5 = (a) => { }; // error -^- no return value

/** @type {function(number, ...string[]): void} */
const func6 = (a, b, c) => { };

/** // @callback is like @typedef
 * @callback clbck
 * @param {number} a
 * @returns {number}
 */
/**
 *  @param {clbck} a
 *  @param {number} b
 *  @returns {number}
 */
function func7(a, b) {
    return a(b);
}
func7((a) => a, 1);

// use previous clbck
/** @type {(a: clbck, b: number) => number} */
function func8(a) { // missing parameter ignored in declaration
    return a(1);
}
func8((a) => a, 2); // error - unexpected parameter in clbck

/**
 * @template Z, X // X is never used
 * @param {Z} a
 * @returns {Z}
 */
function func9(a) {
    return 0; // error - required "Z" type (same as "a" parameter)
}

/**
 * @template {{p:number}} pfield
 * @param {pfield} a
 */
function func10(a) {
    let x = a.b; // error - parameter should not contain "b"
}
func10({ z: 2 });

/**
 * @template {{func():number}} pmethod
 * @param {pmethod} a
 */
function func11(a) {
    a.func();
}
func11({ func: () => 'a' }); // error -  parameter does not contain valid "func()" which returns number


/*
 * CONSTRUCTORS
 */

class Class0 {
    /**
     * @param {number} a // error - no constructor parameter in declaration
     * @this {{a:number, c:number}}
     */
    constructor() {
        this.a = 1; // implicit typing
        /** @type {number} */
        this.b = 2; // error - wrong property of 'this'
        /** @type {number} */
        this.c;
    }
}
let z = new Class0();
z.a = '2'; // error - not number
z.b = '3'; // error - not number
z.c = '3'; // error - not number

// use previous Class0
class Class1 extends Class0 {
    constructor() { super(); }
}
let cl0 = new Class1();
cl0.c = 2;
cl0.d = 2; // error - "d" does not exist in Class0

/**
 * @template Q
 */
class Class2 {
    /**
     * @param {Q} a
     * @this {{ x:Q }}
     */
    constructor(a) {
        this.x = 1; // error - must be type of 'a' (Q)
    }
}

// use previous Class2
/**
 * @template R
 * @extends Class2<R>
 */
class Class3 extends Class2 {
    constructor(a) {
        super(2); // error - must be generic type (R)
        this.x = 2;
    }
}

/**
 * @constructor
 * @param {number} a
 */
function Construct(a) { }
let c0 = new Construct(); // error - argument expected
let c1 = Construct(1) // error - is not callable; 'new' is required
