module type MONAD = {
  type t('a);
  let return: 'a => t('a);
  let (>>=): (t('a), 'a => t('b)) => t('b);
};

module type STATE = {
  type state;
  include MONAD;
  let get: unit => t(state);
  let put: state => t(unit);
  let runState: (t('a), state) => (state, 'a);
};