import mongoose from 'mongoose'
import { User } from './User.model'
import { Category } from './Category.model'

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
    },
  ],
})

export const Game = mongoose.model('Game', GameSchema)
