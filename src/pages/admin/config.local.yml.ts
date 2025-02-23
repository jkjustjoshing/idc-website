import fs from 'node:fs/promises'

const localBackend = `
local_backend:
  url: 'http://localhost:8081/api/v1'
  allowed_hosts: ['localhost']
`

export async function GET() {
  const config = await fs.readFile(new URL('../../../public/config.yml', import.meta.url))
  console.log(config.toString())
  return new Response(config.toString() + localBackend, {
    headers: {
      'Content-Type': 'application/yaml'
    }
  })
}
