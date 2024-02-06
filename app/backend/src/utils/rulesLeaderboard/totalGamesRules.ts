import { IMatches } from '../../Interfaces/IMatches';

const totalGamesRules = (matches: IMatches[], id: number) => {
  const teamsTotal = matches.filter(({ homeTeamId }) => homeTeamId === id);

  return teamsTotal;
};

export default totalGamesRules;
