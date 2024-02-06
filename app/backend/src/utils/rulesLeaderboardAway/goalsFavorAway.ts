import { IMatches } from '../../Interfaces/IMatches';

const goalsFavorAway = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ awayTeamId }) => awayTeamId === id);
  let totalgoalsFavor = 0;
  teamsTotal.forEach(({ awayTeamGoals }) => {
    totalgoalsFavor += awayTeamGoals;
  });
  return totalgoalsFavor;
};

export default goalsFavorAway;
