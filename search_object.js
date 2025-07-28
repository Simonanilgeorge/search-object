let input = {

    "name": "rfk",
    "age": 10
    , "address": {
        "street": "grove street"
        , "second address": {
            "street": "This is the second address"
        }
        , "array": [{

            "name": "abcd"
        }, {
            "name": "abcd"
        }],
        "second_array": ["test", "12"]
        , "2d_array": [["inside 2d", "inside 2d second"]]
        , "3d_array": [ [["3d 1st", "3rd 2nd", "abcs"], ["abc"],[[[["testING"]],{"name":"a","test_key":"test_value"}]],"test_value"] ]
    }
}
let value = "test_value"


// Value to search for

// Entry-point: start recursion
combination(input, []);

// Constructs and logs the path if a match is found
function constructPath(path) {
  let str = path
    .map(p => (typeof p === 'number' ? `[${p}]` : `['${p}']`))
    .join('');
  console.log(str);
}

// Recursively traverse objects and arrays
function combination(data, path) {
  // If it's an array, iterate by index
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      if (el === value) {
        constructPath([...path, i]);
      } else if (typeof el === 'object' && el !== null) {
        combination(el, [...path, i]);
      }
    }
    return;
  }

  // If it's a plain object, iterate its keys
  if (typeof data === 'object' && data !== null) {
    for (const key of Object.keys(data)) {
      const val = data[key];
      if (val === value) {
        constructPath([...path, key]);
      } else if (typeof val === 'object' && val !== null) {
        combination(val, [...path, key]);
      }
    }
  }
}
