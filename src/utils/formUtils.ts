// We're submitting forms to a Google Sheet, using the instructions shown here
// https://github.com/levinunnink/html-form-to-google-sheet
//
// In the future, maybe use https://www.mailgun.com/pricing/ to send an email when a form is submitted
// using Netlify functions? https://dev.to/zicsus/send-mail-with-netlify-and-mailgun-2eoh

export const FORM_URL =
  'https://script.google.com/macros/s/AKfycbxwaQEwEIyQQ__S9SKi4pIKriUu1LxbpKuUMMjh-De5qNzAgSWGZhbiPkwpW3TzH4-Y/exec'

export const submitForm = async (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const response = await fetch(FORM_URL, {
    method: 'POST',
    body: formData,
  })
  console.log('form', formData, response)
  return response
}
