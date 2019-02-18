import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(
    private http: HttpClient
  ) { }

  getFeedCategories(){
    return this.http.get(".././assets/categories/categories.json")
  }

}
