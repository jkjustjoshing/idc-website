export default {
  backend: {
    name: 'git-gateway',
    branch: 'main', // Branch to update (optional; defaults to main)
  },
  local_backend:
    import.meta.env.MODE === 'development'
      ? {
          url: 'http://localhost:8081/api/v1',
          allowed_hosts: ['localhost'],
        }
      : undefined,
  media_folder: '/public/images/uploads', // Media files will be stored in the repo under public/images/uploads
  public_folder: '/images/uploads',
  collections: [
    {
      name: 'press-releases',
      label: 'Press Releases',
      label_singular: 'Press Release',
      folder: 'src/content/press-releases',
      create: true,
      path: '{{year}}-{{month}}-{{day}}-{{slug}}',
      fields: [
        { label: 'Title', name: 'title', widget: 'string', default: '' },
        { label: 'Subtitle', name: 'subtitle', widget: 'string' },
        {
          label: 'Publish Date',
          name: 'date',
          widget: 'datetime',
          time_format: false,
        },
        { label: 'Draft', name: 'draft', widget: 'boolean', default: true },
        { label: 'Body', name: 'body', widget: 'markdown' },
      ],
    },
    {
      name: 'people',
      label: 'People',
      label_singular: 'Person',
      description:
        "People who are displayed on the website, either as commitee leadership, candidates, or otherwise. Note: adding a person here just makes them available to add to a page. They aren't automatically added by being put here",
      folder: 'src/content/people',
      editor: { preview: false },
      create: true,
      identifier_field: 'name',
      path: '{{slug}}',
      fields: [
        { label: 'Name', name: 'name', widget: 'string' },
        {
          name: 'img',
          label: 'Image',
          widget: 'image',
          required: false,
          choose_url: false,
          media_folder: '/public/images/people',
          public_folder: '/images/people',
        },
      ],
    },
    {
      name: 'designated-candidates',
      label: 'Designated Candidates',
      files: [
        {
          name: 'designated-candidates',
          label: 'Designated Candidates',
          file: 'src/data/designated-candidates.json',
          editor: { preview: false },
          fields: [
            {
              name: 'whatIsADesignatedCandidate',
              label: 'What is a Designated Candidate?',
              description: 'Only appears on Designated Candidates page',
              widget: 'markdown',
            },
            {
              name: 'year',
              label: 'Year',
              widget: 'string',
            },
            {
              name: 'positions',
              label: 'Positions',
              label_singular: 'Position',
              widget: 'list',
              fields: [
                {
                  name: 'name',
                  label: 'Office Name',
                  widget: 'string',
                },
                {
                  name: 'candidates',
                  label: 'Candidates',
                  widget: 'list',
                  fields: [
                    {
                      name: 'candidate',
                      label: 'Candidate',
                      widget: 'relation',
                      collection: 'people',
                      search_fields: ['name'],
                      value_field: '{{slug}}',
                      display_fields: ['name'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      label: 'About',
      files: [
        {
          name: 'about',
          label: 'About',
          file: 'src/data/about.json',
          fields: [
            {
              name: 'about',
              label: 'About the Committee',
              widget: 'markdown',
            },
            {
              name: 'leadership',
              label: 'Committee Leadership',
              widget: 'list',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  widget: 'string',
                },
                {
                  name: 'person',
                  label: 'Person',
                  widget: 'relation',
                  collection: 'people',
                  search_fields: ['name'],
                  value_field: '{{slug}}',
                  display_fields: ['name'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
