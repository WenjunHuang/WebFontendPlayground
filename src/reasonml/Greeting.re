[@react.component]
let make = (~name, ~children) => {
  let (count, setCount) = React.useState(() => 0);

  <div>
    <p>
      {React.string(name ++ " clicked " ++ string_of_int(count) ++ " times")}
    </p>
    <button onClick={_ => setCount(_ => count + 1)}>
      {React.string("Click me")}
    </button>
    children
  </div>;
};