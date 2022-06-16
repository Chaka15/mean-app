import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() {}

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated;
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
