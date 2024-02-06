import { IMatches } from '../../Interfaces/IMatches';

const totalGamesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ awayTeamId }) => awayTeamId === id);

  return teamsTotal;
};

export default totalGamesRules;
