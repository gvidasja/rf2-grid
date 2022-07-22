export function getCars(): Promise<Car[]> {
  return Promise.resolve([{ id: '1', name: 'car 1' }])
}

export interface Car {
  id: string
  name: string
}
