

let input={

    "string_key":"string_test"
    ,"number_key":10
    ,"nested_object":{

        "nested_object_string":"test"
        ,"nested_object_number":20
    }
    ,"array_key":[1,2,3,4,5]
    ,"string_array_key":["a","b","test","c"]
}

let value = "test"


if (!combination(input, [])) {
    console.log("value not found")
}


// construct the path to obtain the value
function constructPath(path) {

    let string = ""
    for (let i = 0; i <= path.length - 1; i++) {

        if (typeof (path[i]) == "string") {
            string += `['${path[i]}']`
        }
        else {
            string += `[${path[i]}]`
        }
    }
    console.log(string)
    // output : ['nested_object']['nested_object_string'] 
}


function combination(data, path) {

    // get the keys from the current object
    let keys = Object.keys(data)

    // loop through the values and keys
    for (let i = 0; i <= keys.length - 1; i++) {


        let key = keys[i]

        // check if value exists in the current key
        if (data[key] == value) {
            path.push(key)
            // console.log(path)
            constructPath(path)
            return true
        }

        // if the type of the value is an object recursively call the function
        if (typeof (data[key]) == "object" && !Array.isArray(data[key])) {

            path.push(key)
            if (combination(data[key], path)) {
                return true
            }
            path.pop()

        }

        // check if the value inside the current key is an array
        if (typeof (data[key]) == "object" && Array.isArray(data[key])) {

            // then loop through the elements of the array and check if the elements inside the array is an object or not
            let array = data[key]

            for (let j = 0; j <= array.length - 1; j++) {

                let element = array[j]

                // check if the element is an object or not 
                // if the type of the element inside the array is an object then recursively call the function again
                if (typeof (element) == "object" && !Array.isArray(element)) {

                    path.push(key)
                    path.push(j)
                    if (combination(element, path)) {
                        return true
                    }
                    path.pop()
                    path.pop()

                }

                // if the value inside the array is not an object then it can be another array or string or number !did not write logic to check for values inside a 2d array. Instead check if the element itself is the value you are looking for

                else if(element==value){
                        path.push(key)
                        path.push(j)
                        constructPath(path)
                        return true
                }


            }
        }


    }
    return false
}
