import { PostsComponent } from './posts.component'
import { ApiService } from "./api.service"
import { EMPTY, of, throwError } from "rxjs"

describe('PostsComponent', () => {
  let api: ApiService
  let component: PostsComponent

  beforeEach(() => {
    api = new ApiService(null)
    component = new PostsComponent(api)
  })

  it('should call getPosts() when ngOnInit()', () => {
    const spy = spyOn(api, 'getPosts').and.callFake(() => {
      return EMPTY
    }) // шпионим за вызовом getPosts(), который возвращает пустой стрим, тк у нас замоканный api

    component.ngOnInit() // вызываем OnInit

    expect(spy).toHaveBeenCalled() // во время вызова OnInit должен вызваться api.getPosts()
  })

  it('should update posts length after ngOnInit()', () => {
    const posts = [
        { title: 'jopa' },
        { title: 'zopa' },
        { title: 'hopa' }
      ]

    spyOn(api, 'getPosts').and.returnValue(of(posts))

    component.ngOnInit()

    expect(component.posts.length).toEqual(posts.length)
  })

  it('should add new post', () => {
    const newPost = { title: 'test' }
    const spy = spyOn(api, 'addPost').and.returnValue(of(newPost))

    component.addPost('test')

    expect(spy).toHaveBeenCalled()
    expect(component.posts.includes(newPost)).toBeTruthy()
  })

  it('should set error message if error', () => {
    const message = 'this is an error'
    spyOn(api, 'addPost').and.returnValue(throwError(message))

    component.addPost('test')

    expect(component.message).toBe(message)
  })

  it('should remove post if user confirmed', () => {
    const removedId = 10
    const spy = spyOn(api, 'removePost').and.returnValue(EMPTY)
    spyOn(window, 'confirm').and.returnValue(true)

    component.removePost(removedId)

    expect(spy).toHaveBeenCalledWith(removedId)
  })

  it('should not remove post if user didnt confirmed', () => {
    const spy = spyOn(api, 'removePost').and.returnValue(EMPTY)
    spyOn(window, 'confirm').and.returnValue(false)

    component.removePost(10)

    expect(spy).not.toHaveBeenCalled()
  })
})
