import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from 'src/app/posts/post.interface';
import { PostForm } from '../post-form.interface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  public form!: FormGroup<PostForm>;
  private mode = 'create';
  private postId!: string;
  private post!: Post;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId') || '';
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });

    this.initializeForm();
  }

  public onSavePost(): void {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      id: '',
      title: this.form.value.title ?? '',
      content: this.form.value.content ?? '',
    };

    if (this.mode === 'create') {
      this.postsService.addPost(post);
      this.form.reset();
      return;
    }
    if (this.mode === 'edit') {
      this.postsService.updatePost(this.postId, post);
      this.form.reset();
      return;
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      title: [
        this.post?.title ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      content: [this.post?.content ?? '', Validators.required],
    });
  }
}
