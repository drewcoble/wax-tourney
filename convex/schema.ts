import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  leagues: defineTable({
    name: v.string(),
    week: v.optional(v.float64()),
  }),
  matchups: defineTable({
    leagueId: v.id('leagues'),
    team1: v.id('teams'),
    team2: v.id('teams'),
    week: v.float64(),
    group: v.float64(),
  }),
  teams: defineTable({
    name: v.string(),
    rank: v.float64(),
    leagueId: v.id('leagues'),
    group: v.optional(v.float64()),
    scores: v.array(v.float64()),
    wins: v.float64(),
    losses: v.float64(),
    ties: v.optional(v.float64()),
  }),
})
