import { IMatches } from '../../Interfaces/IMatches';
import P from './totalPointsAway';
import J from './totalGamesAway';
import V from './totalVictoriesAway';
import E from './totalDrawsAway';
import D from './totalLossesAway';
import GP from './goalsFavorAway';
import GS from './goalsOwnAway';
import { ITeams } from '../../Interfaces/ITeams';

const awayLeaderboard = (data: IMatches[], allTeams:ITeams[]) => {
  const allLeaderboard = allTeams.map(({ teamName, id }) => ({
    name: teamName,
    totalPoints: P(data, id),
    totalGames: J(data, id).length,
    totalVictories: V(data, id),
    totalDraws: E(data, id),
    totalLosses: D(data, id),
    goalsFavor: GP(data, id),
    goalsOwn: GS(data, id),
    goalsBalance: GP(data, id) - GS(data, id),
    efficiency: ((P(data, id) / (J(data, id).length * 3)) * 100).toFixed(2).toString(),
  }));
  return allLeaderboard;
};

export default awayLeaderboard;
