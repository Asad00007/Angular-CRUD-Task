import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../posts.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css',
})
export class UpdatePostComponent implements OnInit {
  @Output() cancelPost = new EventEmitter<boolean>();
  @Input() selectedPost;
  token;

  cancelPosts() {
    this.cancelPost.emit();
  }
  constructor(private postService: PostService) {}

  updatePostForm: FormGroup;

  ngOnInit(): void {
    this.updatePostForm = new FormGroup({
      name: new FormControl(this.selectedPost.name, [Validators.required]),
      description: new FormControl(this.selectedPost.description, [
        Validators.required,
      ]),
      image_path: new FormControl(this.selectedPost.image_path, [
        Validators.required,
      ]),
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    this.token = accessToken;
  }
  update() {
    if (!this.updatePostForm.valid) {
      alert('Please fill out all fields');
    } else {
      const id = this.selectedPost.id;
      const name = this.updatePostForm.value.name;
      const description = this.updatePostForm.value.description;
      const image_path = this.updatePostForm.value.image_path;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      this.postService
        .updatePost(id, name, description, image_path, {
          headers,
        })
        .subscribe((resData) => {
          console.log(resData);
          this.postService.created.emit();
          this.cancelPosts();
        });
    }
  }
}
