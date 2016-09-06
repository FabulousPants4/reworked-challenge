import express from 'express'
import bodyParser from 'body-parser'
import expressPromise from 'express-promise'
import { createDb, validator } from './utils.js'

const studentValidation = {
  name: {
    presence: true,
  },
  age: {
    numericality: true,
    presence: true,
  },
}

const pagingValidation = {
  direction: {
    inclusion: {
      within: ['asc', 'desc'],
      message: 'must be "asc" or "desc"',
    }
  },
  limit: {
    numericality: true,
  },
  offset: {
    numericality: true,
  },
}

const app = express()
app.use(bodyParser.json());
app.use(expressPromise());

const db = createDb("students.db")

app.get('/api/students', validator('query', pagingValidation),
  ({ query: { limit=20, offset=0, sort, direction }}, res) => {
    db.find({ limit, offset, sort, direction }).then(res.send);
})

app.get('/api/students/:id', 
  ({ params: {id} }, res) => {
    db.findOne(id).then(res.send);
})

app.post('/api/students', validator('body', studentValidation),
  ({ body: student }, res) => {
    db.insert(student).then(res.send)
})

app.patch('/api/students/:id',
  ({ params: { id }, body: student }, res) => {
    db.update(id, student).then(() => res.sendStatus(204))
})

app.delete('/api/students/:id',
  ({ params: { id } }, res) => {
    db.remove(id).then(() => res.sendStatus(204))
})

app.listen(4000)