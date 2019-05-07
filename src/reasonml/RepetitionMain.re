module CountThree: Repetition.Count = {
  let count = 3;
};

module RepetitionThree =
  Repetition.Make({
    let count = 3;
  });