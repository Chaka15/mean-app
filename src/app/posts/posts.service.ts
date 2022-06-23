import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Subject } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  private readonly baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ message: string; posts: any }>(this.baseUrl)
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated;
  }

  addPost(post: Post) {
    this.http.post<{ message: string }>(this.baseUrl, post).subscribe(() => {
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete(`${this.baseUrl}/${postId}`).subscribe();
  }
}
