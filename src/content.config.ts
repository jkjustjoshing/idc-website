import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const pressReleaseCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press-releases' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    draft: z.boolean(),
  }),
})

const peopleCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
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
