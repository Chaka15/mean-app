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

  getPost(id: string): Post {
    return {
      ...this.posts.find((post) => post.id === id)!,
    };
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; postId: string }>(this.baseUrl, post)
      .subscribe((responseData) => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(postId: string, postData: Post): void {
    const post: Post = {
      ...postData,
      id: postId,
    };

    this.http.put(`${this.baseUrl}/${postId}`, post).subscribe();
  }

  deletePost(postId: string) {
    this.http.delete(`${this.baseUrl}/${postId}`).subscribe(() => {
      const updatedPosts = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
