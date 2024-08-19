import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../../posts.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent implements OnInit {
  @Output() cancelPost = new EventEmitter<boolean>();
  @Input() id: number;
  token;
  message;

  constructor(private postService: PostService) {}
  cancelDelete() {
    this.cancelPost.emit();
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    this.token = accessToken;
  }

  delete(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.postService.deletePost(id, { headers }).subscribe((resData) => {
      console.log(resData);
      this.postService.created.emit();
      this.cancelPost.emit();
    });
  }
}
