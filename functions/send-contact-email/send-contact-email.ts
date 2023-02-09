import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import { EXTERNAL_URL } from '@/utils/forms/config'

// TODO Add captcha

export const handler: Handler = async (event, context) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  let formData: string
  if (event.headers['content-type'] === 'application/json') {
    const body = JSON.parse(event.body)

    // For debug purposes
    body['_no_email'] = true

    formData = Object.entries(body)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(String(value))
      )
      .join('&')
  } else if (
    event.headers['content-type'] === 'application/x-www-form-urlencoded'
  ) {
    formData = event.body
  } else {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  const response = await fetch(EXTERNAL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })

  const json = ((await response.json()) || {}) as any

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    }
  } else if (json?.result === 'error') {
    return {
      statusCode: 400,
      body:
        json?.error && typeof json.error === 'string'
          ? json.error
          : 'There was an error running the Google App Script',
    }
  }

  return {
    statusCode: 200,
    body: event.body,
  }
}
