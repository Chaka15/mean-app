import { Component } from '@angular/core';
import { Post } from './models/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  posts: Post[] = [];

  onPostCreated(post: Post) {
    this.posts.push(post);
  }
}
