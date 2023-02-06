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
      name: 'designated-candidates',
      label: 'Designated Candidates',
      files: [
        {
          name: 'designated-candidates',
          label: 'Designated Candidates',
          file: 'src/data/designated-candidates.json',
          fields: [
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
                      name: 'name',
                      label: 'Candidate Name',
                      widget: 'string',
                    },
                    {
                      name: 'img',
                      label: 'Image',
                      widget: 'image',
                      required: false,
                      choose_url: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
