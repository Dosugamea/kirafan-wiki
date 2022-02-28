export function lazy_load_array(lazy_variables, target = {}) {
  const output = target;
  const _var = {};

  lazy_variables.forEach(([key, fn]) => {
    const load = async () => {
      if (!_var[key]) {
        _var[key] = fn();
      }
      return await _var[key];
    };
    Object.defineProperty(output, key, {
      get: load,
      enumerable: true,
      configurable: true,
    });
  });
  return output;
}

export const optional_chain = (...arg) =>
  arg.reduce((prev, current) => prev?.[current]);

export const nullish = (val, def) => val ?? def;
