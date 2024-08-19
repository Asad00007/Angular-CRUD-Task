import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  allPosts1: any[] = [];
  getPostResponse;
  created: EventEmitter<void> = new EventEmitter();
  createPost(
    name: string,
    description: string,
    image_path: string,
    options?: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/posts',
      {
        name: name,
        description: description,
        image_path: image_path,
      },
      options
    );
  }

  updatePost(
    id: number,
    name: string,
    description: string,
    image_path: File,
    options?: any
  ) {
    return this.http.put(
      `http://127.0.0.1:8000/api/posts/${id}`,
      {
        name: name,
        description: description,
        image_path: image_path,
      },
      options
    );
  }

  getSinglePost(id: number, options?: any) {
    return this.http.get(`http://127.0.0.1:8000/api/posts/${id}`, options);
  }
  getPosts<T>(pageNumber: number, options?: any) {
    return this.http.get(
      `http://127.0.0.1:8000/api/posts?page=${pageNumber}`,
      options
    );
  }

  deletePost(id: number, options?: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/posts/${id}`, options);
  }
}
