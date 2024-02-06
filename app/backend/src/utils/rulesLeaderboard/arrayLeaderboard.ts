import { IMatches } from '../../Interfaces/IMatches';
import P from './totalPointsRule';
import J from './totalGamesRules';
import totalVictoriesRules from './totalVictoriesRules';
import totalDrawsRules from './totalDrawsRules';
import totalLossesRules from './totalLossesRules';
import goalsFavorRules from './goalsFavorRules';
import goalsOwnRules from './goalsOwnRules';
import { ITeams } from '../../Interfaces/ITeams';

const arrayLeaderboard = (data: IMatches[], allTeams:ITeams[]) => {
  const allLeaderboard = allTeams.map(({ teamName, id }) => ({
    name: teamName,
    totalPoints: P(data, id),
    totalGames: J(data, id).length,
    totalVictories: totalVictoriesRules(data, id),
    totalDraws: totalDrawsRules(data, id),
    totalLosses: totalLossesRules(data, id),
    goalsFavor: goalsFavorRules(data, id),
    goalsOwn: goalsOwnRules(data, id),
    goalsBalance: goalsFavorRules(data, id) - goalsOwnRules(data, id),
    efficiency: ((P(data, id) / (J(data, id).length * 3)) * 100).toFixed(2).toString(),
  }));
  return allLeaderboard;
};

export default arrayLeaderboard;
