import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post } from 'src/app/posts/post.interface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onAddPost(): void {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      id: '',
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.postsService.addPost(post);
    this.form.reset();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', Validators.required],
    });
  }
}
