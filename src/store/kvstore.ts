export interface KeyValue<V = any> {
  key: string
  value: V

  creationDate: Date
  editDate: Date

  accessCount: number
}

export class KvStore {
  private store = new Map<string, KeyValue>()

  constructor() {}

  public getValue(key: string): KeyValue | null {
    const kv = this.store.get(key)

    if (!kv) return null

    return kv
  }

  public setValue(key: string, newValue: any): KeyValue | null {
    let kv = this.store.get(key)

    if (!kv) {
      kv = this._createKV(key, newValue)
      this.store.set(key, kv)
      return kv
    }

    kv.accessCount += 1
    kv.value = newValue
    kv.editDate = new Date()
    this.store.set(key, kv)

    return kv
  }

  public deleteValue(key: string): boolean {
    return this.store.delete(key)
  }

  public list() {
    return Array.from(this.store, ([key, value]) => ({ key, value }))
  }

  private _createKV(key: string, value: string): KeyValue {
    return {
      key: key,
      value: value,
      accessCount: 0,
      creationDate: new Date(),
      editDate: new Date(),
    }
  }
}
