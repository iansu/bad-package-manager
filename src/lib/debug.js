const debug = (...items) => {
  if (process.env.DEBUG) {
    console.debug(...items);
  }
};

export { debug };
