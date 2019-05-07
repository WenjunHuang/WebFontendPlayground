type point = [ | `Point(float, float)];
type shape = [ | `Rectangle(point, point) | `Circle(point, float)];

let pi = 4.0 *. atan(1.0);

let computeArea = (s: shape) =>
  switch (s) {
  | `Rectangle(`Point(x1, y1), `Point(x2, y2)) =>
    let width = abs_float(x2 -. x1);
    let height = abs_float(y2 -. y1);
    width *. height;
  | `Circle(_, radius) => pi *. radius ** 2.0
  };

type shapePlus = [
  | `Rectangle(point, point)
  | `Circle(point, float)
  | `Triangle(point, point, point)
];

let shoelaceFormula = (`Point(x1, y1), `Point(x2, y2), `Point(x3, y3)) =>
  0.5
  *. abs_float(
       x1 *. y2 -. x3 *. y2 +. x3 *. y1 -. x1 *. y3 +. x2 *. y3 -. x2 *. y1,
     );

let computeAreaPlus = (sp: shapePlus) =>
  switch (sp) {
  | `Triangle(p1, p2, p3) => shoelaceFormula(p1, p2, p3)
  | #shape as s => computeArea(s)
  };