import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface PostResponse {
  response: {
    data: {
      current_page: number;
      data?: any;
      first_page_url: string;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
    message: string;
    status: number;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  toggleCreate = false;
  toggleUpdate = false;
  toggleDelete = false;
  subscription: Subscription;
  searchQuery: string;
  errorMessage: string = null;
  currentItem;
  totalPages;
  pageNumber = 1;
  lastPage;
  currentId;
  constructor(private postservice: PostService, private router: Router) {}
  allPosts;
  totalPosts: any[] = [];

  ngOnInit(): void {
    this.subscription = this.postservice.created.subscribe(() => {
      this.postservice
        .getPosts<PostResponse>(this.pageNumber, { headers })
        .subscribe((resData) => {
          this.allPosts = resData;
          this.totalPosts = this.allPosts.response.data.data;
          this.postservice.allPosts1 = this.totalPosts;
          this.totalPages = Math.ceil(
            this.allPosts.response.data.total /
              this.allPosts.response.data.per_page
          );
          this.lastPage = this.allPosts.response.data.last_page;
        });
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accessToken = userData?.access_token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    this.postservice
      .getPosts<PostResponse>(this.pageNumber, { headers })
      .subscribe((resData) => {
        console.log(resData);
        this.postservice.getPostResponse = resData;
        this.allPosts = resData;
        this.totalPosts = this.allPosts.response.data.data;
        this.postservice.allPosts1 = this.totalPosts;
        this.totalPages = Math.ceil(
          this.allPosts.response.data.total /
            this.allPosts.response.data.per_page
        );
        this.lastPage = this.allPosts.response.data.last_page;
      });
  }

  searchPost() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.totalPosts = this.allPosts.response.data.data.filter((post) => {
        return post.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      if (this.totalPosts.length < 1 && this.searchQuery !== '') {
        this.errorMessage = 'No match found';
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      } else {
        this.errorMessage = null;
      }
    } else {
      this.totalPosts = this.allPosts.response.data.data;
    }
    this.postservice.allPosts1 = this.totalPosts;
  }

  viewDetails(id: number) {
    this.router.navigate(['/', id]);
  }

  toggleUpdates(item: string) {
    this.toggleUpdate = true;
    this.currentItem = item;
    console.log(this.currentItem);
  }

  nextPage() {
    if (this.pageNumber < this.lastPage) {
      this.pageNumber = this.pageNumber + 1;
    }
    this.postservice.created.emit();
  }
  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
    }
    this.postservice.created.emit();
  }
  pageChange() {
    this.postservice.created.emit();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
