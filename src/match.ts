/**
 * Copyright (c) 2016 shogogg <shogo@studofly.net>
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
export interface Match {
  <T, U>(value: T, matcher: (when: When<T, U>) => void): U;
  <T, U>(matcher: (when: When<T, U>) => void): (value: T) => U;
}

export interface When<T, U> {

  (that: T, block: (x: T) => U): void;
  (that: (x: T) => boolean, block: (x: T) => U): void;
  else(block: (x: T) => U): void;

}

declare type Matcher<T, U> = (when: When<T, U>) => void;

export const match: Match = function match<T, U>(value: T | Matcher<T, U>, matcher?: Matcher<T, U>): U | ((value: T) => U) {
  if (arguments.length === 1) {
    return build(value as Matcher<T, U>);
  } else {
    return build(matcher)(value as T);
  }
};

function build<T, U>(m: Matcher<T, U>): (value: T) => U {
  return resolve<T, U>(matchers<T, U>(m));
}

function matchers<T, U>(m: Matcher<T, U>): any[][] {
  let matchers: any[][] = [];
  let when: any = (that: T | ((x: T) => boolean), block: (x: T) => U): void => {
    matchers.push([typeof that === 'function' ? that: (x: T) => x === that, block]);
  };
  when.else = (block: (x: T) => U): void => {
    matchers.push([() => true, block]);
  };
  m(when);
  return matchers;
}

function resolve<T, U>(matchers: any[][]): (value: T) => U {
  let n = matchers.length;
  return (value: T): U => {
    for (let i = 0; i < n; ++i) {
      let [guard, block] = matchers[i];
      if (guard(value) === true) {
        return block(value);
      }
    }
    throw new Error('MatchError: Given value does not match any cases');
  };
}
