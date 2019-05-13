let styles = [%raw {| require("./Lession01Lecture.scss") |}];

module Oscillator = {
  open WebAudio;
  type t = {
    audioContext: AudioContext.t,
    oscillatorNode: OscillatorNode.t,
    gainNode: GainNode.t,
    pitchBase: float,
    pitchBend: float,
    pitchRange: float,
    volume: float,
    maxVolume: float,
    hasConnected: bool,
    frequency: float,
  };

  let create = (): t => {
    let ac = AudioContext.make();
    let on = AudioContext.createOscillator(ac);
    OscillatorNode.start(on, 0.0);
    let gn = AudioContext.createGain(ac);
    GainNode.connect(gn, AudioContext.destination(ac));

    {
      audioContext: ac,
      oscillatorNode: on,
      gainNode: gn,
      pitchBase: 50.0,
      pitchBend: 0.0,
      pitchRange: 2000.0,
      volume: 0.5,
      maxVolume: 0.5,
      frequency: 50.0,
      hasConnected: false,
    };
  };

  let play = (v: t): t => {
    OscillatorNode.connect(v.oscillatorNode, v.gainNode);
    {...v, hasConnected: true};
  };

  let stop = (v: t): t =>
    if (v.hasConnected) {
      OscillatorNode.disconnect(v.oscillatorNode, v.gainNode);
      {...v, hasConnected: false};
    } else {
      v;
    };

  let setPitchBend = (t: t, p: float): t => {
    let frequency = t.pitchBase +. t.pitchBend *. t.pitchRange;
    let f = OscillatorNode.frequency(t.oscillatorNode);
    AudioParam.value(f, frequency);
    {...t, pitchBend: p, frequency};
  };

  let setVolume = (t: t, v: float): t => {
    let volume = t.maxVolume *. v;
    let x = GainNode.gain(t.gainNode);
    AudioParam.value(x, volume);
    {...t, volume};
  };
};

module Tone = {
  //  type t = {
  //    pitch: float,
  //    volume: float,
  //    isPlaying: bool,
  //  };

  [@react.component]
  let make = (~isPlaying: bool, ~pitch: float, ~volume: float) => {
    let (oscillator, _) = React.useState(() => ref(Oscillator.create()));
    let doImperativeStuff = (isPlaying: bool, pitch: float, volume: float) => {
      Oscillator.(
        {
          oscillator :=
            (
              if (isPlaying) {
                play(oscillator^);
              } else {
                stop(oscillator^);
              }
            )
            ->setPitchBend(pitch)
            ->setVolume(volume);
        }
      );
    };

    let _ =
      React.useEffect(() => {
        doImperativeStuff(isPlaying, pitch, volume);
        None;
      });

    ReasonReact.null;
  };
};

module App = {
  type appState = {
    pitch: float,
    volume: float,
    isPlaying: bool,
  };

  [@react.component]
  let make = () => {
    let (t, setState) =
      React.useState(() =>
        ({pitch: 0.0, volume: 0.0, isPlaying: false}: appState)
      );

    let play = () => {
      setState(old => {...old, isPlaying: true});
    };

    let stop = () => {
      setState(old => {...old, isPlaying: false});
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

          setState(old => {...old, pitch, volume});
          ();
        }}>
        <SineWave
          amplitude={t.volume}
          frequency={t.pitch}
          draw={t.isPlaying}
          width="400px"
          height="400px"
        />
        <Tone isPlaying={t.isPlaying} pitch={t.pitch} volume={t.volume} />
      </div>
      <div
        style={ReactDOMRe.Style.make(~color="#444444", ())}
        className={Cn.make([styles##label, styles##pitch])}>
        {React.string("Pitch")}
      </div>
      <div className={Cn.make([styles##label, styles##volume])}>
        {React.string("Volume")}
      </div>
    </div>;
  };
};
ReactDOMRe.renderToElementWithId(<App />, "container");