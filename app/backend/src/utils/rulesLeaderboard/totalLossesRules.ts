import { IMatches } from '../../Interfaces/IMatches';

const totalLossesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);
  let totalLosses = 0;
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

export default totalLossesRules;
