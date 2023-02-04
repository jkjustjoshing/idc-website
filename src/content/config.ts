import { z, defineCollection } from 'astro:content'
const pressReleaseCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    draft: z.boolean(),
  }),
})

export const collections = {
  'press-releases': pressReleaseCollection,
}
