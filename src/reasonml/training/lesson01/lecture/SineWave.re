[@react.component]
let make =
    (
      ~amplitude: float,
      ~frequency: float,
      ~draw: bool,
      ~width: string,
      ~height: string,
    ) => {
  <canvas width height />;
};