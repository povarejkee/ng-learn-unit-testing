import { CounterComponent } from './counter.component'
import { FormBuilder } from "@angular/forms"

describe('CounterComponent', () => {
  let component: CounterComponent
  let result: number = null

  beforeEach(() => {
    /*
    * Чтобы каждый раз не создавать инстанс компонента в 'it',
    * в Жасмине есть такие функции как beforeEach, то есть
    * 'Выполнить перед каждым it' */
    component = new CounterComponent(new FormBuilder())
  }) // beforeAll, afterEach, afterAll -- есть еще такие

  it('inc() should increment counter by 1', () => {
    component.inc()
    expect(component.counter).toBe(1)
  })

  it('dec() should decrement counter by 1', () => {
    component.dec()
    expect(component.counter).toBe(-1)
  })


  // тестирование эмиттера
  beforeEach(() => {
    result = null
  })

  it('inc() should emit correct value', () => {
    component.counterEmitter.subscribe((number: number) => {
      result = number
    })

    component.inc()
    expect(result).toBe(1)
  })

  it('dec() should emit correct value', () => {
    component.counterEmitter.subscribe((number: number) => {
      result = number
    })

    component.dec()
    expect(result).toBe(-1)
  })

  // тестирование формы
  it('should create form with 2 controls', () => {
    expect(component.form.contains('login')).toBeTruthy()
    expect(component.form.contains('password')).toBeTruthy()
  })

  it('should mark login as invalid if empty', () => {
    const loginControl = component.form.get('login')

    loginControl.setValue('')

    expect(loginControl.valid).toBeFalsy()
  })

  it('should mark password as invalid if less 6 symbols', () => {
    const passwordControl = component.form.get('password')

    passwordControl.setValue('qwert')

    expect(passwordControl.valid).toBeFalsy()
  })

})
