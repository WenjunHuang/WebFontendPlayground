type app('a, 'f);

module type Newtype1 = {
  type s('a);
  type t;

  let inj: s('a) => app('a, t);
};