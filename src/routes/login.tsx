import { useAuthActions } from '@convex-dev/auth/react'
import { Button, Grid, Input, Stack } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import BackButton from '~/components/BackButton'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { signIn } = useAuthActions()
  const [step, setStep] = useState<'signUp' | 'signIn'>('signIn')

  return (
    <Grid p={{ xs: 'xs', sm: 'xl' }} gutter="md">
      <BackButton />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          void signIn('password', formData)
        }}
      >
        <Stack gap="xs">
          <Input name="email" placeholder="Email" type="text" />
          <Input name="password" placeholder="Password" type="password" />
          <Input name="flow" type="hidden" value={step} />
          <Button type="submit">
            {step === 'signIn' ? 'Sign in' : 'Sign up'}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setStep(step === 'signIn' ? 'signUp' : 'signIn')
            }}
          >
            {step === 'signIn' ? 'Sign up instead' : 'Sign in instead'}
          </Button>
        </Stack>
      </form>
    </Grid>
  )
}
