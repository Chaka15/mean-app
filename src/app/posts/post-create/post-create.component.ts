import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  @Output() createPost = new EventEmitter<Post>();

  enteredTitle = '';
  enteredContent = '';

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };

    this.createPost.emit(post);
  }
}
