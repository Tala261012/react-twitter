class Post {
  static #list = []
  static #count = 1

  constructor(username, text) {
    this.id = Post.#count++

    this.username = username
    this.text = text
    this.date = new Date().getTime()

    this.reply = []
  }

  static create(username, text, post) {
    const newPost = new Post(username, text)

    // post не обязателен, только тогда используется, когда мы создаем пост в ответ на другойй пост
    // то есть post - это уже существующий пост

    if (post) {
      post.reply.push(newPost)

      console.log(post)
    } else {
      this.#list.push(newPost)
    }

    console.log(this.#list)

    return newPost
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = { Post }
