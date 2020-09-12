import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<{ title: string } []> {
    return this.http.get<{ title: string } []>('')
  }

  public addPost(post: { title: string }): Observable<{ title: string }> {
    return this.http.post<{ title: string }>('', post)
  }

  public removePost(id: number): Observable<void> {
    return this.http.delete<void>(`${id}`)
  }
}
