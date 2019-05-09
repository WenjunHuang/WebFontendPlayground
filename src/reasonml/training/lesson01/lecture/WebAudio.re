module AudioParam = {
  type t;

  [@bs.set] external value: (t, float) => unit = "value";
};

module AudioNode = {
  type t;
};

module GainNode = {
  type t;

  [@bs.get] external gain: t => AudioParam.t = "gain";

  [@bs.send] external connect: (t, AudioNode.t) => unit = "connect";
};

module OscillatorNode = {
  type t;

  [@bs.send] external start: (t, float) => unit = "start";
  [@bs.send] external connect: (t, GainNode.t) => unit = "connect";
  [@bs.send] external disconnect: (t, GainNode.t) => unit = "disconnect";
  [@bs.get] external frequency: t => AudioParam.t = "frequency";
};

module AudioContext = {
  type t;
  [@bs.new] external make: unit => t = "AudioContext";
  [@bs.send]
  external createOscillator: t => OscillatorNode.t = "createOscillator";

  [@bs.send] external resume: t => unit = "resume";
  [@bs.send] external createGain: t => GainNode.t = "createGain";

  [@bs.get] external destination: t => AudioNode.t = "destination";
};