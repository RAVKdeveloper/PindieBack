import mongoose from 'mongoose'
import { Category } from './Category.model'
import { User } from './User.model'

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
  vote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
})

export const Game = mongoose.model('Game', GameSchema)
