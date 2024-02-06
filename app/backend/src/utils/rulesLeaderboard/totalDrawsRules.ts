import { IMatches } from '../../Interfaces/IMatches';

const totalDrawsRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);
  let totalDraws = 0;
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals === awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

export default totalDrawsRules;
