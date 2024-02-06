import { IMatches } from '../../Interfaces/IMatches';

const totalPointsRule = (matches: IMatches[], id: number) => {
  let totalPoints = 0;
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);
  teamsTotal.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      totalPoints += 3;
    } else if (homeTeamGoals === awayTeamGoals) {
      totalPoints += 1;
    }
  });

  return totalPoints;
};

export default totalPointsRule;
