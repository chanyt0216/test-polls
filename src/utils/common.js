export const COLORS_LIST = [
  '#c5fecb',
  '#dba9de',
  '#b4f999',
  '#90c6f2',
  '#90dac4',
  '#a6f1d5',
  '#8988ad',
  '#f5e7c7',
  '#ccceae',
  '#b9e3e9',
  '#c0ded2',
  '#90a5a6',
];

export const getResultCount = (results, qid, aid) => {
  const result = Object.keys(results)
    .map((key) => results[key])
    .filter((result) => {
      if (result.qid === qid && result.aid === aid) {
        return result;
      }

      return null;
    });

  return result.length;
};
