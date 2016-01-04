/// <reference path='../typings/jasmine/jasmine.d.ts'/>

import * as maps from './maps';

describe('maps', () => {

  describe('uniqueIndex method', () => {

    it('creates map correctly', () => {
      var map = maps.uniqueIndex([1,2], i => { return i * 10 });

      expect(map).toEqual(new Map()
        .set(10, 1)
        .set(20, 2));
    })

    it('fails if there are duplicated keys', () => {
      try {
        var map = maps.uniqueIndex([1,2], i => { return 1 });
        fail();
      } catch (e) {
        expect(e.message).toBe("Duplicated key: 1");
      }
    })
  });

  describe('toMap method', () => {

    it('creates map correctly', () => {
      var map = maps.toMap([1,2], v => { return v * 10});

      expect(map).toEqual(new Map()
        .set(1, 10)
        .set(2, 20));
    });
  });

  describe('transformEntries method', () => {

    it('transforms map correctly', () => {
      var map = maps.transformEntries(
        new Map<number, number>().set(1,10).set(2,20), (k, v) => {
          return [k * 10, v * 10];
      });

      expect(map).toEqual(new Map()
        .set(10, 100)
        .set(20, 200));
    });
  });
})
