const BASE_URL = ''

export async function getCars(): Promise<Car[]> {
  const skins = await get<CarDTO[]>('/rest/race/car')

  const cars = new Map<string, CarDTO[]>()

  skins.forEach(skin => {
    if (!cars.get(skin.fullPathTree)) {
      cars.set(skin.fullPathTree, [])
    }

    cars.get(skin.fullPathTree)?.push(skin)
  })

  return Array.from(cars.entries())
    .map(([name, skins]) => ({
      id: name.replace(/, ?/g, ' / '),
      skins: skins.map(skin => ({ id: skin.id, name: skin.name.replace(/ [\d\w\.]+$/, '') })),
    }))
    .sort(({ id: a }, { id: b }) => (a < b ? -1 : a > b ? 1 : 0))
}

export async function healthCheck(): Promise<boolean> {
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 500)

  try {
    const r = await fetch('/navigation/state', { signal: ctrl.signal })
    clearTimeout(timeout)
    return r.status < 300
  } catch {
    return false
  }
}

export async function setAiDriversToZero(): Promise<void> {
  let opponents = await getParam('SESSSET_Num_Opponents')

  while (opponents > 0) {
    opponents = await setParam('SESSSET_Num_Opponents', 0)
  }
}

async function getParam(param: string): Promise<number> {
  const { stringValue } = await get<{ stringValue: string }>(`/rest/sessions/setting/${param}`)
  return parseInt(stringValue)
}

async function setParam(param: string, value: 0 | 1): Promise<number> {
  const { stringValue } = await post<{ stringValue: string }>('rest/sessions/settings', {
    sessionSetting: param,
    value,
  })
  return parseInt(stringValue)
}

export async function getFilterIndex(
  reportProgress: (progress: [number, number]) => void
): Promise<FilterIndex> {
  const filters = (await get<OpponentFilter[]>('/rest/sessions/opponents/filter')).filter(f => !!f)

  for (const filter of filters.filter(x => x.state === 'OP_OR')) {
    await toggleOpponentFilter(filter, 0)
  }

  const filterIndex: FilterIndex = {}

  for (let i = 0; i < filters.length; i++) {
    reportProgress([i, filters.length])

    const filter = filters[i]
    const res = await toggleOpponentFilter(filter, 1)

    for (const op of res.opponents.filter(op => !!op)) {
      filterIndex[op.name] = filter.gSelectedListIndex
    }

    await toggleOpponentFilter(filter, 0)
  }

  return filterIndex
}

function toggleOpponentFilter(
  filter: { gSelectedListIndex: number },
  state: 0 | 1
): Promise<{ opponents: { name: string; id: number }[] }> {
  return post('/rest/sessions/opponents', { state, vectorIndex: filter.gSelectedListIndex })
}

export async function selectOpponents(ids: number[]): Promise<void> {
  for (const id of ids) {
    await post('/rest/sessions/opponents', { state: 1, vectorIndex: id })
  }
}

export async function addToRace(skin: string): Promise<void> {
  await postText('/rest/sessions/ai/add', skin)
}

function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(r => r.json())
}

function post<T>(url: string, body: any): Promise<T> {
  return fetch(BASE_URL + url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  }).then(r => r.json())
}

async function postText(url: string, body: string): Promise<void> {
  await fetch(BASE_URL + url, { method: 'post', body, headers: {} })
}

export interface Car {
  id: string
  skins: Skin[]
}

export interface Skin {
  id: string
  name: string
}

export interface Opponent {
  id: number
  name: string
}

export type FilterIndex = {
  [key: string]: number
}

interface CarDTO {
  id: string
  name: string
  fullPathTree: string
}

interface OpponentFilter {
  state: string
  stringValue: string
  gSelectedListIndex: number
  gVehFilterIndex: number
}
