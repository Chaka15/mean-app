import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, Observable, Subject, Subscription } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  private readonly baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): Subscription {
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

  getPostUpdateListener(): Subject<Post[]> {
    return this.postsUpdated;
  }

  getPost(
    id: string
  ): Observable<{ _id: string; title: string; content: string }> {
    return this.http.get<{ _id: string; title: string; content: string }>(
      `${this.baseUrl}/${id}`
    );
  }

  addPost(post: Post): void {
    this.http
      .post<{ message: string; postId: string }>(this.baseUrl, post)
      .subscribe((responseData) => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(postId: string, postData: Post): void {
    const post: Post = {
      ...postData,
      id: postId,
    };

    this.http.put(`${this.baseUrl}/${postId}`, post).subscribe(() => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex((p) => p.id === postId);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string): void {
    this.http.delete(`${this.baseUrl}/${postId}`).subscribe(() => {
      const updatedPosts = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
