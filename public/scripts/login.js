import { showTooltip } from './dom-creators.js'

const form = document.querySelector('.auth-form')
form &&
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const formData = new FormData(form)
    try {
      const response = await fetch('/api/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      if (response.status !== 200) {
        throw new Error((await response.json()).message)
      }
      const result = await response.json()
      window.location.href = '/api/dashboard'
    } catch (error) {
      showTooltip(error.message)
      return error
    }
  })

// const logoutButton = document.querySelector('.logout-button')
// logoutButton &&
//   logoutButton.addEventListener('click', async () => {
//     window.location.href = '/'
//   })
