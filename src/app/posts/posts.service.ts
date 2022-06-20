import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postsResponse) => {
        this.posts = postsResponse.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated;
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        console.log(response.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
