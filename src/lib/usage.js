const printUsage = () => {
  const usageMessage = `bad [command]

Commands:
  install [options] [package]
  clean`;

  console.log(usageMessage);
};

export { printUsage };
