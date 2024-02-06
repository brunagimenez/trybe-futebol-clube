import { ILeaderboard } from '../../Interfaces/ILeaderboard';

const calculateOrder = (a: ILeaderboard, b: ILeaderboard): number => {
  if (b.totalPoints !== a.totalPoints) {
    return b.totalPoints - a.totalPoints;
  } if (b.totalVictories !== a.totalVictories) {
    return b.totalVictories - a.totalVictories;
  } if (b.goalsBalance !== a.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsOwn - a.goalsOwn;
};
export default calculateOrder;
