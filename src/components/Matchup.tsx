import { Flex, Group, Stack } from '@mantine/core'
import type { Matchups, Teams } from '../types/convexTypes'

const Matchup = ({
  matchup,
  teams,
  week,
}: {
  matchup: Matchups
  teams: Teams
  week: number
}) => {
  const teamOne = teams.find((t: any) => t._id.toString() === matchup[0].team1)
  const teamTwo = teams.find((t: any) => t._id.toString() === matchup[0].team2)

  return (
    <Stack
      align="center"
      bdrs="md"
      bg="#ffffff08"
      gap="xs"
      justify="center"
      p="md"
      w="300px"
    >
      <Group>
        {teamOne?.rank}. {teamOne?.name} -{' '}
        {teamOne?.scores[week - 1].toString()}
      </Group>
      <Flex
        align="center"
        justify="center"
        bdrs="9"
        h="32"
        w="32"
        bg="#ffffff0f"
        c="white"
        fw="bold"
      >
        vs.
      </Flex>
      <Group>
        {teamTwo?.rank}. {teamTwo?.name} -{' '}
        {teamTwo?.scores[week - 1].toString()}
      </Group>
    </Stack>
  )
}

export default Matchup
