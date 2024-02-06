import { IMatches } from '../../Interfaces/IMatches';

const goalsFavorRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);
  let totalgoalsFavor = 0;
  teamsTotal.forEach(({ homeTeamGoals }) => {
    totalgoalsFavor += homeTeamGoals;
  });
  return totalgoalsFavor;
};

export default goalsFavorRules;
