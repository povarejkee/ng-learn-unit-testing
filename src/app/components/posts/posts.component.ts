import { Component, OnInit } from '@angular/core'
import { ApiService } from "./api.service"

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: { title: string } [] = []
  public title: string
  public message: string

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPosts().subscribe(
      (response: { title: string } []) => {
        this.posts = response
      }
    )
  }

  public addPost(title: string): void {
    const post = { title }
    this.api.addPost(post).subscribe(
      (response: { title: string }) => {
        this.posts.unshift(response)
      },
      (error: string) => {
        this.message = error
      }
    )
  }

  public removePost(id: number): void {
    if (confirm('Вы действительно хотите удалить пост?')) {
      this.api.removePost(id).subscribe()
    }
  }
}
