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

  getCategoryBySlug(slug){
    return new Promise<any>((resolve, reject) => {
      this.getFeedCategories()
      .subscribe( res =>{
        Object.keys(res['categories']).forEach(function(key){
          if(res['categories'][key].slug == slug){
              resolve(res['categories'][key])
          }
        });
        reject()
      })
    })
  }

}
