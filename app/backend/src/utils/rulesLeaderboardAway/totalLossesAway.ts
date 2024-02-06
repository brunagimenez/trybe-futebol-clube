import { IMatches } from '../../Interfaces/IMatches';

const totalLossesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ awayTeamId }) => awayTeamId === id);
  let totalLosses = 0;
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals < homeTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

export default totalLossesRules;
