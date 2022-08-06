import { KvStore } from '../../store/kvstore'
import express, { Router } from 'express'

const parseAllBodyAsText = express.text({
  type: '*/*',
})

export function kvRouter(kvStore: KvStore) {
  const router = Router()

  router.get('/store/:key', parseAllBodyAsText, (req, res) => {
    const key = req.params['key']

    const val = kvStore.getValue(key)
    if (val === null) {
      return res.sendStatus(404)
    }

    res.json(val)
  })

  router.post('/store/:key', parseAllBodyAsText, (req, res) => {
    const key = req.params['key']

    const value = req.body
    const kv = kvStore.setValue(key, value)

    res.json(kv)
  })

  router.delete('/store/:key', parseAllBodyAsText, (req, res) => {
    const key = req.params['key']

    const kv = kvStore.deleteValue(key)
    res.json(kv)
  })

  router.get('/list', (_, res) => {
    return res.json(kvStore.list())
  })

  return router
}
