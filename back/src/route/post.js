// Подключаем технологию express для back-end сервера
const e = require('express')
const express = require('express')

// Создаем роутер - место, куда мы подключаем эндпоинты
const router = express.Router()

const { Post } = require('../class/post')

// ==========================================================

//router.get создает нам один эндпоинт

// вводим путь к странице

router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body

    if (!username || !text) {
      return res.status(400).json({
        message:
          'Нужно ввести все данные для создания поста',
      })
    }

    let post = null

    console.log('postId:', postId)

    if (postId) {
      post = Post.getById(Number(postId))
      console.log('post:', post)

      if (!post) {
        return res.status(400).json({
          message: 'Поста с таким Id не существует',
        })
      }
    }

    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        message: 'Нужно передать Id поста ',
      })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'Поста с таким Id не существует',
      })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        text: post.text,
        username: post.username,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          text: reply.text,
          username: reply.username,
          date: reply.date,
        })),
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

// Подключаем роутер к бек-энду
module.exports = router
