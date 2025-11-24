import { Grid, Stack, Text, Title } from '@mantine/core'
import type { Teams } from '~/types/convexTypes'

const StandingsContent = ({
  groups,
  teams,
}: {
  groups: Array<Record<string, string | number>>
  teams: Teams
}) => {
  return (
    <Grid.Col span={{ xs: 12, sm: 6 }}>
      <Grid.Col>
        <Title order={2} mb="md">
          Standings
        </Title>
        {groups.map((g) => (
          <>
            <Stack gap={4} mb="md">
              <Title order={3}>{g.name}</Title>
              {teams
                .filter((t) => t.group === g.num)
                .sort((a, b) => a.wins - b.wins)
                .map((team) => (
                  <Text key={team._id.toString()}>
                    <strong>{team.rank}.</strong> {team.name} ({team.wins}-
                    {team.losses}
                    {(team.ties ?? 0) > 0 ? `-${team.ties}` : ''})
                  </Text>
                ))}
            </Stack>
          </>
        ))}
      </Grid.Col>
    </Grid.Col>
  )
}

export default StandingsContent
