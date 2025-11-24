import { Grid, Stack, Title } from '@mantine/core'
import Matchup from './Matchup'
import type { Matchups, Teams } from '~/types/convexTypes'

const MatchupsContent = ({
  groups,
  matchups,
  teams,
  weeks,
}: {
  groups: Array<Record<string, string | number>>
  matchups: Matchups
  teams: Teams
  weeks: Array<number>
}) => {
  return (
    <Grid.Col span={{ xs: 12, sm: 6 }}>
      <Title order={2} mb="md">
        Matchups
      </Title>
      {weeks.map((week) => (
        <Grid.Col key={week}>
          <Stack gap="xs">
            <Title order={3}>Week {week}</Title>
            {groups.map((g) => (
              <Stack gap="xs" key={String(g.num)}>
                {matchups
                  .filter((m) => m.week === week && m.group === g.num)
                  .map((m) => (
                    <Matchup
                      key={m._id.toString()}
                      matchup={[m]}
                      teams={teams}
                      week={week}
                    />
                  ))}
              </Stack>
            ))}
          </Stack>
        </Grid.Col>
      ))}
    </Grid.Col>
  )
}

export default MatchupsContent
