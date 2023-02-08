import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import { EXTERNAL_URL } from '@/utils/formUtils'

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
    formData = Object.entries(body)
      .map(([key, value]) => encodeURI(key) + '=' + encodeURI(String(value)))
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

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: response.statusText,
    }
  }

  return {
    statusCode: 200,
    body: event.body,
  }
}
