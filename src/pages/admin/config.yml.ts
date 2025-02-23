import fs from 'node:fs/promises'

export async function GET() {
  const config = await fs.readFile(new URL('./config.yml', import.meta.url))
  return new Response(config, {
    headers: {
      'Content-Type': 'application/yaml'
    }
  })
}
