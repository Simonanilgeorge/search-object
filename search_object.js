
let input={

    "name":"rfk",
    "age":10
    ,"address":{
        "street":"grove street"
        ,"second address":{
            "street":"This is the second address"
        }
        ,"array":[{

            "name":"abc"
        },{
            "name":"def"
        }],
        "second_array":["test","testing"]
        ,"2d_array":[["inside 2d","inside 2d second"]]
        ,"3d_array":[[["3d 1st","3rd 2nd"]]]
    }
}
let value = "3d 1st"


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

                // search inside the array
                else if (typeof(element)=="object" && Array.isArray(element)){

                    path.push(key)
                    path.push(j)
                    if(combination(element,path)){
                        return true
                    }
                    path.pop()
                    path.pop()
                }

                else if(typeof(element)!="object" && element==value){
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


 
// // to get list of all tables
// let tables=input['model']['tables']
 
// for(let table of tables){
 
//     if('measures' in table){
 
//         console.log(`${table.name} -- MEASURES --\n`)
//         for(let measure of table.measures){
//             console.log(measure.name)
//         }
//         console.log("\n")
//     }
 
 
//     let columns=table.columns
 
//     // console.log(columns)
//     let calculatedColumns=[]
//     for(let column of columns){
 
//         if ('type' in column && column.type=='calculated'){
//             calculatedColumns.push(column)
//         }  
//     }
 
//     if(calculatedColumns.length){
 
//         console.log(`-- CALCULATED COLUMNS IN ${table.name} --`)
//         for (let column of calculatedColumns){
 
//             console.log(column.name)
//         }
//     }
//     console.log("\n")
// }