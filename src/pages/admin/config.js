export default {
  backend: {
    name: 'git-gateway',
    branch: 'cms', // Branch to update (optional; defaults to main)
  },
  local_backend:
    import.meta.env.MODE === 'development'
      ? {
          url: 'http://localhost:8081/api/v1',
          allowed_hosts: ['localhost'],
        }
      : undefined,
  media_folder: 'public/images/uploads', // Media files will be stored in the repo under public/images/uploads
  public_folder: 'images/uploads',
  collections: [
    {
      name: 'press-releases',
      label: 'Press Releases',
      folder: 'src/content/press-releases',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
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
  ],
}
