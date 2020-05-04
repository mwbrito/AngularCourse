import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

export class CrudService<T> {

    constructor(protected http: HttpClient, private API_URL) {}

    list(){
        return this.http.get<T[]>(this.API_URL);
      }
    
      loadById(id){
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private create(record){
        return this.http.post(this.API_URL, record).pipe(take(1));
      }
    
      private update(record){
        return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
      }
    
      save(record){
        if(record.id){
          return this.update(record);
        } else {
          return this.create(record);
        }
      }
    
      remove(recordId){
        return this.http.delete(`${this.API_URL}/${recordId}`).pipe(take(1));
      }
}