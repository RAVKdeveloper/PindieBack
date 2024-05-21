import { getData } from './api-interactors.js'
import { addCategoriesEditModeListeners } from './categories-edit-mode.js'
import { renderCategoriesList, renderGames, renderUsersList } from './dom-creators.js'
import { addGamesEditModeListeners } from './games-edit-mode.js'
import {
  addCategoryFormListeners,
  addDeleteCategoryListeners,
  addDeleteGameListeners,
  addDeleteUsersListeners,
  addGameFormListeners,
  addUserFormListeners,
} from './requests.js'
import { addUsersEditModeListeners } from './users-edit-mode.js'

export let gamesState = []
export let usersState = []
export let categoriesState = []

export async function reload(blockName) {
  switch (blockName) {
    case 'games':
      loadGamesBlock()
      break
    case 'users':
      loadUsersBlock()
      break
    case 'categories':
      loadCategoriesBlock()
      break
    default:
      console.log('Unknown block name')
      break
  }
}

;(async function init() {
  await loadGamesBlock()
  await loadCategoriesBlock()
  await loadUsersBlock()
})()

async function loadGamesBlock() {
  const data = await getData('/api/game')
  gamesState = data.data
  if (!document.querySelector('.games-list')) return
  document.querySelector('.games-list').innerHTML = ''
  renderGames(gamesState)
  addGamesEditModeListeners()
  addGameFormListeners()
  await addDeleteGameListeners()
}

async function loadUsersBlock() {
  const data = await getData('/api/users')
  usersState = data.data
  if (!document.querySelector('.users-list')) return
  document.querySelector('.users-list').innerHTML = ''
  renderUsersList(usersState)
  addUsersEditModeListeners()
  await addUserFormListeners()
  await addDeleteUsersListeners()
}

async function loadCategoriesBlock() {
  const data = await getData('/api/category')
  categoriesState = data.data
  if (!document.querySelector('.categories-list')) return
  document.querySelector('.categories-list').innerHTML = ''
  renderCategoriesList(categoriesState)
  addCategoriesEditModeListeners()
  await addCategoryFormListeners()
  await addDeleteCategoryListeners()
}
