import { convexQuery } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Grid } from '@mantine/core'
import BackButton from '~/components/BackButton'
import MatchupsContent from '~/components/MatchupsContent'
import StandingsContent from '~/components/StandingsContent'

export const Route = createFileRoute('/groupStage')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: { teams },
  } = useSuspenseQuery(
    convexQuery(api.myFunctions.listTeams, {
      //   leagueId: 'jh7aafsz2067gp5vz2efmc0svx7vwvy1' as Id<'leagues'>,
    }),
  )
  const {
    data: { matchups },
  } = useSuspenseQuery(
    convexQuery(api.myFunctions.listMatchups, {
      //   leagueId: 'jh7aafsz2067gp5vz2efmc0svx7vwvy1' as Id<'leagues'>,
    }),
  )

  const groups = [
    { num: 1, name: 'Group A' },
    { num: 2, name: 'Group B' },
  ]

  return (
    <Grid p={{ xs: 'xs', sm: 'xl' }} gutter="md">
      <BackButton />
      <StandingsContent groups={groups} teams={teams} />
      <MatchupsContent
        groups={groups}
        matchups={matchups}
        teams={teams}
        weeks={[1, 2, 3]}
      />
    </Grid>
  )
}
