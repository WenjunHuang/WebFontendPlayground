let styles = [%raw {| require("./Lession01Lecture.scss") |}];

type tone = {
  pitch: float,
  volume: float,
};

module type O = {
  let play: unit => unit;
  let stop: unit => unit;
};

module Oscillator: O = {
let os

};
module App = {
  [@react.component]
  let make = () => {
    let (isPlaying, setIsPlaying) = React.useState(() => false);
    let (t, setTone) = React.useState(() => {pitch: 0.0, volume: 0.0});

    let play = () => {
      setIsPlaying(_ => true);
    };

    let stop = () => {
      setIsPlaying(_ => false);
    };

    <div className=styles##app>
      <div
        className=styles##theremin
        onMouseEnter={_ => play()}
        onMouseLeave={_ => stop()}
        onMouseMove={event => {
          let clientX = ReactEvent.Mouse.clientX(event);
          let clientY = ReactEvent.Mouse.clientY(event);
          let bounding =
            ReactEvent.Mouse.target(event)##getBoundingClientRect();
          let pitch =
            (float_of_int(clientX) -. bounding##left)
            /. (bounding##right -. bounding##left);
          let volume =
            1.0
            -. (float_of_int(clientY) -. bounding##top)
            /. (bounding##bottom -. bounding##top);

          setTone(_ => {pitch, volume});
          ();
        }}
      />
      <div className={Cn.make([styles##label, styles##pitch])}>
        {React.string("Pitch")}
      </div>
      <div className={Cn.make([styles##label, styles##volume])}>
        {React.string("Volume")}
      </div>
    </div>;
  };
};
ReactDOMRe.renderToElementWithId(<App />, "container");