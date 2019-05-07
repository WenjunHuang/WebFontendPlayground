module type LogWithDateInterface = {
  include (module type of Log);
  let logStrWithDate: (t, t) => t;
};

module LogWithDate: LogWithDateInterface = {
  include Log;
  let logStrWithDate = (str: string, log: t) => {
    let dateStr = Js.Date.toISOString(Js.Date.make());
    logStr("[" ++ dateStr ++ "]" ++ str, log);
  };
};

module PrintableString = {
  type t = string;
  let print = (s: t) => s;
};

module PrintableInt = {
  type t = int;
  let print = (i: t) => string_of_int(i);
};

module PrintableSI = PrintablePair1.Make(PrintableString, PrintableInt);

let () = {
  LogWithDate.(
    make() |> logStrWithDate("Hello") |> logStrWithDate("everyone") |> print
  );
  NamespaceA.(Util.func());

  print_string(RepetitionMain.RepetitionThree.repeat("abc\n"));

  let pair = PrintableSI.make("Jane", 53);
  let str = PrintableSI.print(pair);

  print_endline(str);
};