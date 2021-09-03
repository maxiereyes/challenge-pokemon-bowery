const iterateEvolution = (data) => {
  let evalutionsData = [];

  const iterateItem = (obj) => {
    for (const prop in obj) {
      if (typeof obj[prop] == "object") {
        if (prop == "species") {
          evalutionsData.push(obj[prop]);
        } else {
          iterateItem(obj[prop]);
        }
      }
    }
  };

  data.filter((item) => {
    iterateItem(item);
  });

  return evalutionsData;
};

export default iterateEvolution;
