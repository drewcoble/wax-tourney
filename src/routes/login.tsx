import { useAuthActions } from '@convex-dev/auth/react'
import { Stack } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { signIn } = useAuthActions()
  const [step, setStep] = useState<'signUp' | 'signIn'>('signIn')
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        void signIn('password', formData)
      }}
    >
      <Stack gap="xs">
        <input name="email" placeholder="Email" type="text" />
        <input name="password" placeholder="Password" type="password" />
        <input name="flow" type="hidden" value={step} />
        <button type="submit">
          {step === 'signIn' ? 'Sign in' : 'Sign up'}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(step === 'signIn' ? 'signUp' : 'signIn')
          }}
        >
          {step === 'signIn' ? 'Sign up instead' : 'Sign in instead'}
        </button>
      </Stack>
    </form>
  )
}
