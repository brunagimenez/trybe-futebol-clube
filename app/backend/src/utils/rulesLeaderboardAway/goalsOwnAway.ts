import { IMatches } from '../../Interfaces/IMatches';

const goalsOwnAway = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ awayTeamId }) => awayTeamId === id);
  let totalgoalsOwn = 0;
  teamsTotal.forEach(({ homeTeamGoals }) => {
    totalgoalsOwn += homeTeamGoals;
  });
  return totalgoalsOwn;
};

export default goalsOwnAway;
