open Webapi;
open Canvas;
[@react.component]
let make =
    (
      ~amplitude: float,
      ~frequency: float,
      ~draw: bool,
      ~width: string,
      ~height: string,
    ) => {
  let canvasRef = React.useRef(Js.Nullable.null);
  let framesRef = React.useRef(0.0);

  let drawWave = (ctx: Canvas2d.t, w: float, h: float, drawDone: unit => unit) => {
    let frames = React.Ref.current(framesRef);
    let phi = frames /. 30.0;
    let amplitude = h *. amplitude;
    let frequency = frequency /. 2.0;
    let offset = (h -. amplitude) /. 2.0;

    Canvas2d.(
      {
        lineWidth(ctx, 4.0);
        clearRect(ctx, ~x=0.0, ~y=0.0, ~w, ~h);
        setStrokeStyle(ctx, String, "white");

        ctx |> moveTo(~x=0.0, ~y=h);
        ctx |> beginPath;
        for (x in 0 to int_of_float(w)) {
          let y =
            sin(float_of_int(x) *. frequency +. phi)
            *. amplitude
            /. 2.0
            +. amplitude
            /. 2.0;
          ctx |> lineTo(~x=float_of_int(x), ~y=y +. offset);
        };
        ctx |> stroke;
      }
    );
    React.Ref.setCurrent(framesRef, frames +. 1.0);
    drawDone();
  };

  let renderCanvas = () => {
    switch (Js.Nullable.toOption(React.Ref.current(canvasRef))) {
    | None => (() => ())
    | Some(can) =>
      if (draw) {
        let ctx = CanvasElement.getContext2d(can);
        let h = CanvasElement.height(can)->float_of_int;
        let w = CanvasElement.width(can)->float_of_int;

        let stop = ref(false);
        let rec keepDraw = () =>
          if (! stop^) {
            requestAnimationFrame(_ => drawWave(ctx, w, h, keepDraw));
          };
        requestAnimationFrame(_ => keepDraw());
        (
          () => {
            stop := true;
            ();
          }
        );
      } else {
        (() => ());
      }
    };
  };

  let _ =
    React.useEffect(() =>
      if (draw) {
        let stopAni = renderCanvas();
        Some(stopAni);
      } else {
        None;
      }
    );

  <canvas ref={ReactDOMRe.Ref.domRef(canvasRef)} width height />;
};