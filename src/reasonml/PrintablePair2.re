module type S = {
  type fst;
  type snd;
  type t;
  let make: (fst, snd) => t;
  let print: t => string;
};

module Make =
       (Fst: PrintablePair1.PrintableType, Snd: PrintablePair1.PrintableType)
       : (S with type fst = Fst.t and type snd = Snd.t) => {
  type fst = Fst.t;
  type snd = Snd.t;
  type t = (fst, snd);
  let make = (f: fst, s: snd) => (f, s);
  let print = ((f, s): t) =>
    "(" ++ Fst.print(f) ++ ", " ++ Snd.print(s) ++ ")";
};

module MakeDestructive =
       (Fst: PrintablePair1.PrintableType, Snd: PrintablePair1.PrintableType)
       : (S with type fst := Fst.t and type snd := Snd.t) => {
  type t = (Fst.t, Snd.t);
  let make = (fst: Fst.t, snd: Snd.t) => (fst, snd);
  let print = ((fst, snd): t) =>
    "(" ++ Fst.print(fst) ++ ", " ++ Snd.print(snd) ++ ")";
};