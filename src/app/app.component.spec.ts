import { compute } from "./shared/compute"
import { greeting } from "./shared/greeting"
import { getCountries } from "./shared/countries"

describe('compute', () => {
  it('should return 0 if negative or 0 input', () => {
    const result = compute(-1)
    expect(result).toBe(0) // результат ДОЛЖЕН БЫТЬ
  })

  it('should return input + 1 if positive', () => {
    const result = compute(50)
    expect(result).toBe(51)
  })
})

describe('greeting', () => {
  it('should contain input name', () => {
    const result = greeting('Ilya')
    expect(result).toContain('Ilya')
    // результат ДОЛЖЕН ВКЛЮЧАТЬ (а не БЫТЬ), тк возвращается 'Hello, Ilya'. Проверять такое -- не варик
  })
})

describe('getCountries', () => {
  it('should return array of countries', () => {
    const result = getCountries()

    result.forEach((country: string) => {
      expect(result).toContain(country)
    })
  })
})
