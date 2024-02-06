import { IMatches } from '../../Interfaces/IMatches';

const totalVictoriesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);

  let totalVictories = 0;
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals, homeTeamId }) => {
    if (homeTeamGoals > awayTeamGoals) {
      totalVictories += 1;
    }
    return { teamId: homeTeamId, point: totalVictories };
  });
  return totalVictories;
};

export default totalVictoriesRules;
