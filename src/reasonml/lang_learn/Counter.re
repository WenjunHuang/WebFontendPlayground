let touch = (t, s) => {
  let count =
    switch (List.assoc(t, s)) {
    | x => x
    | exception Not_found => 0
    };
  [(t, count + 1), ...List.remove_assoc(t, s)];
};