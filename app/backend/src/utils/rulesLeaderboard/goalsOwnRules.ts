import { IMatches } from '../../Interfaces/IMatches';

const goalsOwnRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);
  let totalgoalsOwn = 0;
  teamsTotal.forEach(({ awayTeamGoals }) => {
    totalgoalsOwn += awayTeamGoals;
  });
  return totalgoalsOwn;
};

export default goalsOwnRules;
