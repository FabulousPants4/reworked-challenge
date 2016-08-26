import Datastore from 'nedb'
import validate from 'validate.js';
import { merge } from 'lodash'

// I don't want error messages to be formated
// that would make them inaccurate for api responses
// Validate.js is really geared towards frontend, but 
// is flexible enough for this purpose.
// Overriding these stops the messages from being
// converted to a "human readable" format.
validate.capitalize = x => x 
validate.prettify = x => x

validate.options = {
  prettify: x => x,
  stringifyValue: x => x,
}

const sortCriteria = ({ sort, direction }) => {
  return sort
    ? {[sort]: direction === 'desc' ? -1 : 1}
    : undefined
}

const promisifyDb = db => ({
  find: ({ limit, offset, sort, direction, ...criteria }) => {
    const request = db.find(criteria)
                      .sort(sortCriteria({ sort, direction }))
                      .limit(Number(limit))
                      .skip(Number(offset))

    return promisify(request.exec.bind(request))
  },
  findOne: id => {
    return promisify(db.findOne.bind(db, { _id: id }))
  },
  insert: obj => {
    return promisify(db.insert.bind(db, obj))
  },
  update: (id, doc) => {
    return promisify(db.update.bind(db, { _id: id }, doc))
  },
  remove: id => {
    return promisify(db.remove.bind(db, { _id: id }))
  },
})

const promisify = (fn) => {
  return new Promise((res, rej) => {
    fn((err, success) => {
      if (err) {
        rej(err)
      } else {
        res(success)
      }
    })
  })
}

export const validator = (param, ...constraints) => (req, res, next) => {
  const validation = validate.validate(req[param], merge(...constraints));
  if (validation) {
    res.status(400)
    res.send({
      errors: validation
    })
  } else {
    next()
  }
}

export const createDb = filename => {
  return promisifyDb(new Datastore({ filename, autoload: true }))
}
