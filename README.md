# mcz
A simple pattern matching library for JavaScript/TypeScript.

## Install
```
$ npm install --save mcz
```

## Usage
### in TypeScript
```
import {match} from "mcz";

var result = match<number, string>(2, when => {
  when(1, () => 'One');
  when(2, () => 'Two');
  when(3, () => 'Three');
  when.else(() => 'Others');
});

assert(result === 'Two');
```

### in JavaScript
```
var match = require("mcz").match;

var result = match(2, function (when) {
  when(1, function () {
    return 'One';
  });
  when(2, function () {
    return 'Two';
  });
  when(3, function () {
    return 'Three';
  });
});

assert(result === 'Two');
```

## API
### `match<T, U>(matcher: (x: T) => void): (x: T) => U`
Create a pattern-matching function.

```
var f = match<number, string>(when => {
  when(1, () => 'Shiori');
  when(2, () => 'Kanako');
  when(3, () => 'Momoka');
  when(4, () => 'Ayaka');
  when(5, () => 'Reni');
});

var arr = [1, 2, 3, 4, 5].forEach(f);

console.log(arr);
// ['Shiori', 'Kanako', 'Momoka', 'Ayaka', 'Reni']
```

### `match<T, U>(value: T, matcher: (x: T) => void): U`
Execute pattern-matching, then returns result.

```
var result = match<string, string>('Yellow', when => {
  when('Red',    () => 'Kanako');
  when('Yellow', () => 'Shiori');
  when('Pink',   () => 'Ayaka');
  when('Green',  () => 'Momoka');
  when('Purple', () => 'Reni');
});

assert(result === 'Shiori');
```

### `when(that: T, block: (x: T) => U): void`
Add a pattern: execute the `block` when the value equals `that` strictly.

```
var result = match<any, string>('123', when => {
  when(123,   () => '123 as a number');
  when('123', () => '123 as a string');
});

assert(result === '123 as a string');
```

### `when(that: (x: T) => boolean, block: (x: T) => U): void`
Add a pattern: execute the `block` when the function `that` returns true.

```
var result = match<any, string>(new Date(), when => {
  when(x => x instanceof String, () => 'value is String');
  when(x => x instanceof Number, () => 'value is Number');
  when(x => x instanceof Date, () => 'value is Date');
});

assert(result === 'value is Date');
```

### `when.else(block: (x: T) => U): void`
Add a pattern: execute the `block` when the value does not match any other values.

```
var result = match<number, string>(9, when => {
  when(x => x < 0, () => 'Less than 0');
  when(x => x < 2, () => 'Less than 2');
  when(x => x < 4, () => 'Less than 4');
  when(x => x < 6, () => 'Less than 6');
  when.else(() => 'Equals 6, or greater than 6');
});

assert(result === 'Equals 6, or greater than 6');
```

## How to build or test
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run build` or `npm test`.


## License
MIT &copy; 2016 shogogg
