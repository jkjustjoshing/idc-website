import { z, defineCollection } from 'astro:content'
const pressReleaseCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    draft: z.boolean(),
  }),
})
const peopleCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    img: z.string().optional(),
    links: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
  }),
})

export const collections = {
  'press-releases': pressReleaseCollection,
  people: peopleCollection,
}
