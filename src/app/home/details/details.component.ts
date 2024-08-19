import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../posts.service';
import { HttpHeaders } from '@angular/common/http';

interface PostInt {
  name: string;
  description: string;
  image_path: string;
}

interface PostResponses {
  response: {
    data: any;
    message: string;
    status: number;
  };
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  currentPostId;
  post;
  postDetails;
  @Input() postId;
  token;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentPostId = params.get('name');
    });

    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;
    this.token = accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.postService
      .getSinglePost(this.currentPostId, { headers })
      .subscribe((resData) => {
        console.log(resData);
        this.post = resData;
        this.postDetails = this.post.response.data;
      });
  }
}
