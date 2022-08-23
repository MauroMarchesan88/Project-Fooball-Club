const categories = [
  'totalPoints',
  'totalVictories',
  'goalsBalance',
  'goalsFavor',
  'goalsOwn',
];

function mainSort(sortedByVictories: any[]) {
  const sortedByTotal = sortedByVictories.sort((a, b) => {
    if (Number(a[categories[0]]) < Number(b[categories[0]])) return 1;
    if (Number(a[categories[0]]) > Number(b[categories[0]])) return -1;
    return 0;
  });
  return sortedByTotal;
}

function sortByVictories(sortedByBalance: any[]) {
  const sortedByVictories = sortedByBalance.sort((a, b) => {
    if (Number(a[categories[1]]) < Number(b[categories[1]])) return 1;
    if (Number(a[categories[1]]) > Number(b[categories[1]])) return -1;
    return 0;
  });
  const result = mainSort(sortedByVictories);
  return result;
}

function sortByBalance(sortedByFavor: any[]) {
  const sortedByBalance = sortedByFavor.sort((a, b) => {
    if (Number(a[categories[2]]) < Number(b[categories[2]])) return 1;
    if (Number(a[categories[2]]) > Number(b[categories[2]])) return -1;
    return 0;
  });
  const result = sortByVictories(sortedByBalance);
  return result;
}

function sortByFavor(sortedByOwn: any[]) {
  const sortedByFavor = sortedByOwn.sort((a, b) => {
    if (Number(a[categories[3]]) < Number(b[categories[3]])) return 1;
    if (Number(a[categories[3]]) > Number(b[categories[3]])) return -1;
    return 0;
  });
  const result = sortByBalance(sortedByFavor);
  return result;
}

export default function megaZort(leaderboard: any[]) {
  const sortedByOwn = leaderboard.sort((a, b) => {
    if (Number(a[categories[4]]) < Number(b[categories[4]])) return -1;
    if (Number(a[categories[4]]) > Number(b[categories[4]])) return 1;
    return 0;
  });
  const result = sortByFavor(sortedByOwn);
  return result;
}
