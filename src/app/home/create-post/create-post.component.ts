import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../../posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  @Output() cancelPost = new EventEmitter<boolean>();
  constructor(private postService: PostService) {}
  createPostForm: FormGroup;
  token;

  cancelPosts() {
    this.cancelPost.emit();
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image_path: new FormControl(null, Validators.required),
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    this.token = accessToken;
  }

  create() {
    if (!this.createPostForm.valid) {
      alert('Please fill out all fields');
    } else {
      const name = this.createPostForm.value.name;
      const description = this.createPostForm.value.description;
      const image_path = this.createPostForm.value.image_path;

      if (this.postService.allPosts1.includes((item) => item.name === name)) {
        console.log('yes');
        alert('Post with same name already exists');
      } else {
        console.log('no');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        });

        this.postService
          .createPost(name, description, image_path, { headers })
          .subscribe((resData) => {
            console.log(resData);
            this.postService.created.emit();
            this.cancelPosts();
          });
      }
    }
  }
}
