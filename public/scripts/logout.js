window.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('#logout')

  logoutBtn.addEventListener('click', logoutUser)

  async function logoutUser() {
    try {
      const response = await fetch(`${window.location.origin}/api/auth/logout`, {
        method: 'PUT',
      })

      const data = await response.json()

      window.location.href = '/'

      return data
    } catch {}
  }
})
