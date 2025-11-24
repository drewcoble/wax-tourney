import { IconArrowLeft } from '@tabler/icons-react'
import { Button, Grid } from '@mantine/core'
import { Link } from '@tanstack/react-router'

const BackButton = ({ link, span }: { link?: string; span?: number }) => {
  return (
    <Grid.Col span={span ?? 12}>
      <Link to={link ?? '/'}>
        <Button variant="subtle" leftSection={<IconArrowLeft />}>
          Back
        </Button>
      </Link>
    </Grid.Col>
  )
}

export default BackButton
