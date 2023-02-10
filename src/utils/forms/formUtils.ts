// We're submitting forms to a Google Sheet, using the instructions shown here
// https://github.com/levinunnink/html-form-to-google-sheet
//
// Via a Netlify Function, the form data is sent to a Google App Script. The App Script:
// * Finds the Sheet in the Google Sheet corresponding to the form type
// * Adds a new row to the Sheet with the form data
// * Sends a notification email to the admin email address (configured in the CONFIG sheet in the same Google Sheet)

export const submitForm = async (form: HTMLFormElement) => {
  const action = form.action
  const formData = new FormData(form)
  const body: Record<string, any> = {}
  formData.forEach((value, key) => (body[key] = value))

  try {
    const response = await fetch(action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { success: response }
  } catch (e) {
    let error: string
    if (typeof e === 'string') {
      error = e
    } else if (e instanceof Error) {
      error = e.message
    } else {
      error = 'Unknown error'
    }
    return { error }
  }
}
