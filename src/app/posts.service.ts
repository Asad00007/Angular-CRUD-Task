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
    image_path: File,
    options?: any
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image_path', image_path); // Appending the file here

    return this.http.post('http://127.0.0.1:8000/api/posts', formData, options);
  }

  updatePost(
    id: number,
    name: string,
    description: string,
    image_path: File,
    options?: any
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image_path', image_path); // Appending the file here

    return this.http.put(
      `http://127.0.0.1:8000/api/posts/${id}`,
      formData,
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
