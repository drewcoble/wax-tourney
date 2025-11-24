import { convexQuery } from '@convex-dev/react-query'
import { Button, Grid, Group, Input, Stack, Title } from '@mantine/core'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { useMemo, useState } from 'react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { useConvexAuth, useMutation } from 'convex/react'
import type { Id } from 'convex/_generated/dataModel'
import type { Team } from '~/types/convexTypes'
import BackButton from '~/components/BackButton'

export const Route = createFileRoute('/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: { teams },
  } = useSuspenseQuery(
    convexQuery(api.myFunctions.listTeams, {
      leagueId: 'jh7aafsz2067gp5vz2efmc0svx7vwvy1' as Id<'leagues'>,
    }),
  )

  const { isAuthenticated, isLoading } = useConvexAuth()

  const [week, setWeek] = useState(0)
  const updateTeamScores = useMutation(api.myFunctions.updateTeamScores)

  const [teamScores, setTeamScores] = useState(
    teams.map((team) => ({
      id: team._id,
      score: team.scores[week],
    })),
  )

  const handleWeekChange = (newWeek: number) => {
    setWeek(newWeek)
    const newWeekScores = teams.map((team) => ({
      id: team._id,
      score: team.scores[newWeek],
    }))
    setTeamScores(newWeekScores)
  }

  const handleScoreChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    team: Team,
  ) => {
    const newScore = parseFloat(e.target.value)
    const updatedScores = [...team.scores]
    if (newScore >= 0) {
      updatedScores[week] = newScore

      await updateTeamScores({
        teamId: team._id,
        scores: updatedScores,
      })
    }
  }

  if (!isAuthenticated && !isLoading) {
    return (
      <Grid p="xl" gutter="md">
        <BackButton />
        <Grid.Col span={12}>
          <Title order={2}>Unauthorized</Title>
          <p>You do not have permission to access this page.</p>
        </Grid.Col>
      </Grid>
    )
  }

  return (
    <Grid p="xl" gutter="md">
      <BackButton />

      <Grid.Col span={12}>
        <Stack gap="md" mb="lg">
          <Group gap="xl">
            <Title order={2}>Edit Scores</Title>
            <Button>Calculate week</Button>
          </Group>
          <Group>
            <Button
              disabled={week <= 0}
              onClick={() => handleWeekChange(week - 1)}
              variant="outline"
            >
              <IconArrowLeft />
            </Button>
            <Title order={3}>Week {week + 12}</Title>
            <Button
              disabled={week >= 6}
              onClick={() => handleWeekChange(week + 1)}
              variant="outline"
            >
              <IconArrowRight />
            </Button>
          </Group>
          {teams.map((team) => (
            <Input.Wrapper key={team._id.toString()} w="300px">
              <Input.Label>
                {team.rank}. {team.name}
              </Input.Label>
              <Input
                type="number"
                value={teamScores.find((t) => t.id === team._id)?.score}
                onChange={(e) => {
                  const newScores = teamScores
                  const teamScoreIdx = newScores.findIndex(
                    (t) => t.id === team._id,
                  )
                  if (teamScoreIdx !== -1) {
                    newScores[teamScoreIdx].score = parseFloat(e.target.value)
                    setTeamScores([...newScores])
                  }
                }}
                onBlur={(e) => handleScoreChange(e, team)}
                w="100%"
              />
            </Input.Wrapper>
          ))}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
