//according to ECMAScript Spec code has been implemented, there might be some bug as i haven't tested yet this code due to lack of time, will do it later today and remove this comment.

const forEach = (callback, args) => {
  // Let O be ? ToObject(this value).
  let O = Object(this);
  // Let len be ? ToLength(? Get(O, "length")).
  let len = O.length;
  // If IsCallable(callbackfn) is false, throw a TypeError exception.
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' not a function');
  }
  // If thisArg is present, let T be thisArg; else let T be undefined.
  let T = args || undefined;
  // Let k be 0.
  let k = 0;
  // Repeat, while k < len
  while(k < len){
    // Let Pk be ! ToString(k).
    let Pk = k.toString();
    // Let kPresent be ? HasProperty(O, Pk).
    let kPresent = O.hasOwnProperty(Pk);
    // If kPresent is true, then
    if(kPresent)
      let kValue = O[Pk]; // Let kValue be ? Get(O, Pk).
    // Perform ? Call(callbackfn, T, « kValue, k, O »).
    let mappedValue = callback.call(T, kValue, k, O);
    // Increase k by 1.
    k++
  }
  return undefined;
  // Return undefined.
}

const map = (callback, args) => {
  // Let O be ? ToObject(this value).
  let O = Object(this);
  // Let len be ? ToLength(? Get(O, "length")).
  let len = O.length;
  // If IsCallable(callbackfn) is false, throw a TypeError exception.
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' not a function');
  }
  // If thisArg is present, let T be thisArg; else let T be undefined.
  let T = args || undefined;
  //Let A be ? ArraySpeciesCreate(O, len).
  let A = ArraySpeciesCreate(O, len);
  //Let k be 0.
  let k = 0;

  while(k < len){
    let Pk = k.toString();
    let kPresent = O.hasOwnProperty(Pk);
    if(kPresent){
      let kValue = O[Pk];
      let mappedValue = callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }
  return A;
}

const filter = (callback, args) => {
  let O = Object(this);
  let len = O.length;
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' not a function');
  }
  let T = args || undefined;
  let A = new Array(0);
  let k = 0;
  let to = 0;
  while(k < len){
    let Pk = k.toString();
    let kPresent = O.hasOwnProperty(Pk);
    if(kPresent){
      let kValue = O[Pk];
      let selected = callback.call(callback, T, kValue, k, O);
      if(selected){
        A[to.toString()] = kValue;
        to++
      }
    }
    k++;
  }
  return A;
}

const reduce = (callback, args) => {
  let O = Object(this);
  let len = O.length;
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' not a function');
  }
  if (len === 0 && !args) {
    throw new TypeError('no initial value passed');
  }
  let k = 0;
  let accumulator = args || undefined;
  if(accumulator == undefined){
    let kPresent = false;
    while(k < len && kPresent === false){
      let Pk = k.toString();
      kPresent = O.hasOwnProperty(Pk);
      if(kPresent){
        accumulator = O[Pk];
      }
      k++;
    }
    if(kPresent === false){
      throw new TypeError("Invalid value")
    }
  }

  while(k < len){
    let Pk = k.toString();
    let kPresent = O.hasOwnProperty(Pk);
    if(kPresent){
      let kValue = O[Pk];
      accumulator = callback.call(callback, undefined, accumulator, kValue, k, O);
    }
    k++;
  }
  return accumulator;
}

export {
  forEach,
  map,
  filter,
  reduce,
}