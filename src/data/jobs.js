export const JOBS = Object.freeze({
  inn: {
    work: (state) => {
      state.money += 8;
      state.constitution += 1;
      state.stress += 1;
    }
  }
});
