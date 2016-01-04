/// <reference path="../typings/es6-collections/es6-collections.d.ts"/>

export function uniqueIndex<K, V>(values : V[], getKey : (value : V) => K) : Map<K, V> {
  var map = new Map<K, V>();
  values.forEach((value) => {
    var key = getKey(value);
    if (map.has(key)) {
      throw new Error(`Duplicated key: ${key}`);
    } else {
      map.set(getKey(value), value);
    }
  });
  return map;
}

export function toMap<K, V>(keys : K[], getValue : (key : K) => V) : Map<K, V> {
  var map = new Map<K, V>();
  keys.forEach((key) => {
    map.set(key, getValue(key));
  });
  return map;
}

export function transformEntries<K1, V1, K2, V2>(values : Map<K1, V1>, f : (value : K1, key: V1) => [K2, V2]) : Map<K2, V2> {
  var map = new Map<K2, V2>();
  values.forEach((value, key) => {
    var [tKey, tValue] = f(key, values.get(key));
    map.set(tKey, tValue);
  });
  return map;
}
