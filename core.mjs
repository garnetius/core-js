/* ================================= $ J $ =====================================
// <core.mjs>
//
// Core JavaScript language extensions.
//
// Copyright garnetius.
// -------------------------------------------------------------------------- */

"use strict"

/* ===--------------------------------------------------------------------------
// Enforce integral number type */
function toInteger (val) {
  return val | 0;
}

/* ===--------------------------------------------------------------------------
// Look up the index of the value in a sorted array using binary search */
function binarySearch (arr, key, cmpfn=binarySearch.compare) {
  let idx = 0;
  let start = 0;
  let end = arr.length;

  while (start !== end) {
    idx = Math.floor ((start + end) / 2);
    const cmp = cmpfn (key, arr[idx]);

    if (cmp < 0) end = idx;
    else if (cmp > 0) start = idx + 1;
    else return idx;
  }

  /* Return the negative value if the provided key
  // wasn't found. This value converted to positive
  // using `Math.abs()` would be the exact index
  // at which the key can be inserted
  // to keep the array sorted. */
  return -(idx + (end === arr.length));
}

/* ===--------------------------------------------------------------------------
// Default comparison function expects two numbers */
Object.defineProperty (binarySearch, "compare", {value: (a, b) => a - b});

/* ===--------------------------------------------------------------------------
// Replace obsolete whitespace control characters */
function normalizeWhiteSpace (input, indent=2) {
  return input
  /* Replace tabs with spaces (only leading tabs will look fine) */
  .replace (/\t/g, ' '.repeat (indent))
  /* Replace Windows and MacOS Classic line endings with line feeds */
  .replace (/\r\n?/g, '\n');
}

/* ===--------------------------------------------------------------------------
// Main interface */
const Core = new Object();
let infected = false;

Object.defineProperties (Core, {
  [Symbol.toStringTag]: {get: () => "Core"},

  /* ===-------------------------
  // Alter built-in prototypes */
  infect: {value: () => {
    if (infected) {
      //console.log ("`core-js`: Already infected");
      return;
    }

    infected = true;

    /* ===----------------
    // Array extensions */
    if (Array.prototype.lastIndex !== undefined) {
      console.log ("`Array.prototype.lastIndex` already defined");
    } else {
      Object.defineProperty (Array.prototype, "lastIndex", {
        get: () => {return this.length - 1}
      });
    }

    /* Accessors */
    if (Array.prototype.first !== undefined) {
      console.log ("`Array.prototype.first` already defined");
      Array.prototype.first = () => {return this[0]};
    } else {
      Object.defineProperty (Array.prototype, "first", {
        value: () => {return this[0]}
      });
    }

    if (Array.prototype.last !== undefined) {
      console.log ("`Array.prototype.last` already defined");
      Array.prototype.last = () => {return this[this.lastIndex]};
    } else {
      Object.defineProperty (Array.prototype, "last", {
        value: () => {return this[this.lastIndex]}
      });
    }

    /* Mutators */
    if (Array.prototype.insert !== undefined) {
      console.log ("`Array.prototype.insert` already defined");
      Array.prototype.insert = (idx, ...items) => {
        this.splice (idx, 0, ...items);
        return this.length;
      };
    } else {
      Object.defineProperty (Array.prototype, "insert", {
        value: (idx, ...items) => {
          this.splice (idx, 0, ...items);
          return this.length;
        }
      });
    }

    if (Array.prototype.remove !== undefined) {
      console.log ("`Array.prototype.remove` already defined");
      Array.prototype.remove = (idx, num) => {return this.splice (idx, num)};
    } else {
      Object.defineProperty (Array.prototype, "remove", {
        value: (idx, num) => {return this.splice (idx, num)}
      });
    }

    /* Plug in binary search */
    if (Array.prototype.binarySearch !== undefined) {
      console.log ("`Array.prototype.binarySearch` already defined");
      Array.prototype.binarySearch = (key, cmpfn) => {
        binarySearch (this, key, cmpfn)
      };
    } else {
      Object.defineProperty (Array.prototype, "binarySearch", {
        value: (key, cmpfn) => {binarySearch (this, key, cmpfn)}
      });
    }
  }}
});

/* ===--------------------------------------------------------------------------
// Exports */
export {
  Core,
  toInteger,
  binarySearch,
  normalizeWhiteSpace
}

/* ===------------------------------ =^.^= -------------------------------=== */
