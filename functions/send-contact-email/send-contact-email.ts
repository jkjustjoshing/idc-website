import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import { EXTERNAL_URL } from '@/utils/forms/config'

// TODO Add captcha
const verifyCaptcha = async (captcha: string) => {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: [
      `response=${captcha}`,
      `secret=${process.env.HCAPTCHA_SECRET}`,
      `sitekey=${process.env.HCAPTCHA_KEY}`,
    ].join('&'),
  })
  if (!response.ok) {
    throw new Error('Captcha verification failed (network error)')
  }
  const result = await response.json()

  if (
    result &&
    typeof result === 'object' &&
    'success' in result &&
    !result.success
  ) {
    console.log(result)
    throw new Error(
      `Captcha verification failed (invalid captcha${
        'error-codes' in result ? ' - ' + result['error-codes'] : ''
      })`
    )
  }
}

export const handler: Handler = async (event, context) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  let body: any
  if (event.headers['content-type'] === 'application/json') {
    body = JSON.parse(event.body)
  } else if (
    event.headers['content-type'] === 'application/x-www-form-urlencoded'
  ) {
    body = Object.fromEntries(
      event.body.split('&').map((pair) => {
        const [key, value] = pair.split('=')
        return [key, decodeURIComponent(value)]
      })
    )
  } else {
    return {
      statusCode: 400,
      body: 'Bad Request',
    }
  }

  const captcha = body['h-captcha-response']
  await verifyCaptcha(captcha)
  delete body['h-captcha-response']
  delete body['g-recaptcha-response']

  const successString = body['successString']
  delete body['successString']

  const formData = Object.entries(body)
    .map(
      ([key, value]) =>
        encodeURIComponent(key.replaceAll(' ', '+')) +
        '=' +
        encodeURIComponent(String(value).replaceAll(' ', '+'))
    )
    .join('&')

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
      body: successString,
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
