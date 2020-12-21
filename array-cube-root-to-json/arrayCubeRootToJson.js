const invalidInput = [true, false, null, undefined];
const cubes = [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000];

const arrayCubeRootToJson = arr => {
    if(!Array.isArray(arr) || arr.length == 0){
        return "Invalid input/not an array.";
    }
    var commonValues = arr.filter(function(n) {
        if(invalidInput.indexOf(n) !== -1) {
            return invalidInput.indexOf(n);
        } else if(typeof(n) === "string"){
            if(parseInt(n) > 0){
                //nothing to do here
            } else {
                return n;
            }
        } 
        return;
    });
    
    if(commonValues.length > 0){
        return "Invalid array value.";
    }

    //find cube root of array values
    let results = {};
    arr.filter(function(value) {
        if(value < 0) {
            //converting - to +
            value = Math.abs(value)
            let cubeRoot = cubes.indexOf(parseInt(value));
            //converting + to -
            value = -Math.abs(value)
            Object.assign(results, {[value]: -Math.abs(cubeRoot+1)});
        } else if(value == Infinity) {
            Object.assign(results, {[value]: Infinity});
        } else if(!isNaN(parseInt(value))){
            let cubeRoot = cubes.indexOf(parseInt(value));
            if(cubeRoot !== -1){
                Object.assign(results, {[value]: cubeRoot+1});
            }
        } else {
            //logic to be added for number which cube root is  > 10
            //will add that later, as running out of time
        }
    });
    return (results)
};

//only sorting of the output object is pending, will do it later after today's session

console.log(   arrayCubeRootToJson([27, 64, 125])   );
console.log(   arrayCubeRootToJson(['27', '64', '125', 1])   );
console.log(   arrayCubeRootToJson([-1, 1, Infinity, 64, -64])   );
console.log(   arrayCubeRootToJson({})   );
console.log(   arrayCubeRootToJson(true)   );
console.log(   arrayCubeRootToJson([null, false])   );
console.log(   arrayCubeRootToJson(false)   );
console.log(   arrayCubeRootToJson(undefined)   );
console.log(   arrayCubeRootToJson([1, 2, 4, 'abc'])   );
console.log(   arrayCubeRootToJson([1, 2.12, 4.44, 'abc'])   );