/**
 * Copyright (c) 2016 shogogg <shogo@studofly.net>
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
import * as assert from "power-assert";
import {match} from "../lib/match";

describe('match', () => {

  it('should be a function', () => {
    assert(typeof match === 'function');
  });

  it('should returns a function when arguments.length === 1', () => {
    let r = match(() => {});
    assert(typeof r === 'function');
  });

  it('should returns the result when arguments.length === 2', () => {
    let r = match<number, string>(1, when => when(1, () => 'One'));
    assert(r === 'One');
  });

  it('should throw an Error when the value does not match any cases', () => {
    let f = () => match<number, string>(2, when => when(1, () => 'One'));
    assert.throws(f, 'MatchError: Given value does not match any cases');
  });

  it('should evaluate the `when.else` block when the value does not match any other cases', () => {
    let r = match<number, string>(6, when => {
      when(1, () => 'Shiori');
      when(2, () => 'Kanako');
      when(3, () => 'Momoka');
      when(4, () => 'Ayaka');
      when(5, () => 'Reni');
      when.else(() => 'Mononofu');
    });
    assert(r === 'Mononofu');
  });

});

describe('when', () => {

  it('should test that the value equals given value when non-function value given', () => {
    let r = match<string, number>('Ayaka', when => {
      when('Shiori', () => 1);
      when('Kanako', () => 2);
      when('Momoka', () => 3);
      when('Ayaka',  () => 4);
      when('Reni',   () => 5);
    });
    assert(r === 4);
  });

  it('should test that values strictly equal', () => {
    let r = match<number, string>(1, when => {
      when("1", () => 'Tamai');
      when(1,   () => 'Shiori');
    });
    assert(r === 'Shiori');
  });

  it('should test that the function returns true when function given', () => {
    let r = match<number, string>(3, when => {
      when(x => x > 3, () => 'Greater than 3');
      when(x => x > 2, () => 'Greater than 2');
      when(x => x > 1, () => 'Greater than 1');
    });
    assert(r === 'Greater than 2');
  });

});
