import { IMatches } from '../../Interfaces/IMatches';

const totalVictoriesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ awayTeamId }) => awayTeamId === id);

  let totalVictories = 0;
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

export default totalVictoriesRules;
