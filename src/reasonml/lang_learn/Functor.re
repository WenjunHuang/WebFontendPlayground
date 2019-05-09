module type Comparable = {
  type t;
  let compare: (t, t) => int;
};
module Make_interval = (Endpoint: Comparable) => {
  type t =
    | Interval(Endpoint.t, Endpoint.t)
    | Empty;
  let create = (low, high) =>
    if (Endpoint.compare(low, high) > 0) {
      Empty;
    } else {
      Interval(low, high);
    };

  let is_empty = (v: t) =>
    switch (v) {
    | Empty => true
    | Interval(_, _) => false
    };

  let contains = (t: t, x: Endpoint.t) =>
    switch (t) {
    | Empty => false
    | Interval(l, h) =>
      Endpoint.compare(x, l) >= 0 && Endpoint.compare(x, h) <= 0
    };

  let intersect = (t1, t2) => {
    let min = (x, y) =>
      if (Endpoint.compare(x, y) <= 0) {
        x;
      } else {
        y;
      };
    let max = (x, y) =>
      if (Endpoint.compare(x, y) >= 0) {
        x;
      } else {
        y;
      };
    switch (t1, t2) {
    | (Empty, _)
    | (_, Empty) => Empty
    | (Interval(l1, h1), Interval(l2, h2)) =>
      create(max(l1, l2), min(h1, h2))
    };
  };
};