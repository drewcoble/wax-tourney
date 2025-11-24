import { Link, createFileRoute } from '@tanstack/react-router'
import { useConvexAuth } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { Button, Card, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { useAuthActions } from '@convex-dev/auth/react'
import { api } from '../../convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const {
    data: { teams },
  } = useSuspenseQuery(
    convexQuery(api.myFunctions.listTeams, {
      leagueId: 'jh7aafsz2067gp5vz2efmc0svx7vwvy1' as Id<'leagues'>,
    }),
  )

  const sortedTeams = [...teams]
  const auth = useAuthActions()
  const { isAuthenticated } = useConvexAuth()

  return (
    <Grid p="xl" gutter="md">
      <Grid.Col span={12}>
        <Group justify="center">
          <Title order={1} mb="md">
            Wax Museum Tourney
          </Title>
          {isAuthenticated && (
            <Button component={Link} to="/edit" mb="md" ml="xl">
              Edit
            </Button>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6 }}>
        <Stack mb="xl" gap="lg">
          <Button
            component={Link}
            to="/groupStage"
            variant="subtle"
            size="lg"
            w="100%"
          >
            <Group>
              <Title order={2}>Group Stage</Title> <IconArrowRight />
            </Group>
          </Button>

          <Button
            component={Link}
            to="/fecesCup"
            variant="subtle"
            size="lg"
            w="100%"
          >
            <Group>
              <Title order={2}>Feces Cup &trade;</Title> <IconArrowRight />
            </Group>
          </Button>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6 }}>
        <Card
          bdrs="md"
          style={{
            background:
              'linear-gradient(to bottom, #ff450044 0%, #ffffff44 50%, #0045ff44 100%)',
          }}
        >
          <Stack gap="xs">
            <Title order={3} ta="center">
              🔥 hot 🥵
            </Title>
            {sortedTeams
              .sort(
                (a, b) =>
                  b.scores.reduce((p, c) => p + c) -
                  a.scores.reduce((p, c) => p + c),
              )
              .map((team, index) => (
                <Grid key={team._id.toString()}>
                  <Grid.Col span={8.5}>
                    <strong>{index + 1}</strong>. {team.name}
                  </Grid.Col>
                  <Grid.Col span={3.5}>
                    <Text>
                      {team.scores.reduce((p, c) => p + c).toFixed(2)}
                    </Text>
                  </Grid.Col>
                </Grid>
              ))}
            <Title order={3} ta="center">
              🧊 cold 🥶
            </Title>
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={12}>
        <Group justify="center" mt="lg">
          {isAuthenticated ? (
            <Button onClick={() => auth.signOut()} size="md" variant="outline">
              logout
            </Button>
          ) : (
            <Button component={Link} to="/login" size="md" variant="outline">
              login
            </Button>
          )}
        </Group>
      </Grid.Col>
    </Grid>
  )
}
