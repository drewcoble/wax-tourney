import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

export const listTeams = query({
  // Validators for arguments.
  args: {
    // leagueId: v.id('leagues'),
  },

  // Query implementation.
  handler: async (ctx) => {
    const teams = await ctx.db.query('teams')
    // teams.filter((t) => t.eq(t.field('leagueId'), args.leagueId))
    return {
      teams: await teams.collect(),
    }
  },
})

export const listMatchups = query({
  // Validators for arguments.
  args: {
    // leagueId: v.id('leagues')
  },

  // Query implementation.
  handler: async (ctx) => {
    const matchups = await ctx.db.query('matchups')
    // matchups.filter((m) => m.eq(m.field('leagueId'), args.leagueId))
    return {
      matchups: await matchups.collect(),
    }
  },
})

export const updateTeamScores = mutation({
  // Validators for arguments.
  args: {
    teamId: v.id('teams'),
    scores: v.array(v.float64()),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    await ctx.db.patch(args.teamId, {
      scores: args.scores,
    })
  },
})

// // You can write data to the database via a mutation:
// export const addNumber = mutation({
//   // Validators for arguments.
//   args: {
//     value: v.number(),
//   },

//   // Mutation implementation.
//   handler: async (ctx, args) => {
//     // Insert or modify documents in the database here.
//     // Mutations can also read from the database like queries.
//     // See https://docs.convex.dev/database/writing-data.

//     // const id = await ctx.db.insert('teams', { rank: args.value })

//     console.log('Added new document with id:', id)
//     // Optionally, return a value from your mutation.
//     // return id;
//   },
// })

// You can fetch data from and send data to third-party APIs via an action:
// export const myAction = action({
//   // Validators for arguments.
//   args: {
//     first: v.number(),
//   },

//   // Action implementation.
//   handler: async (ctx, args) => {
//     // // Use the browser-like `fetch` API to send HTTP requests.
//     // // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     // const response = await ctx.fetch("https://api.thirdpartyservice.com");
//     // const data = await response.json();

//     // // Query data by running Convex queries.
//     const data = await ctx.runQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     })
//     console.log(data)

//     // // Write data by running Convex mutations.
//     await ctx.runMutation(api.myFunctions.addNumber, {
//       value: args.first,
//     })
//   },
// })
