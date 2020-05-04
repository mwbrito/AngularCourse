import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, filter, distinctUntilChanged, debounce, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.http.get(this.SEARCH_URL,  { params: { search: value, fiels: 'name,version'}} )),
      tap((response: any) => this.total = response.total),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    let value = this.queryField.value;

    const params_ = {
      search: value,
      fields: 'name,version'
    }

    let params = new HttpParams();
    params = params.set('search', value);
    params = params.set('fields', 'name,version');
    

    if (value && (value = value.trim()) !== '')


      //this.results$ = this.http.get(this.SEARCH_URL + '?search='+value+'&fields=name,version')
      this.results$ = this.http.get(this.SEARCH_URL,  {params} )
        .pipe(
          tap((res: any) => this.total = res.total),
          map(res => res.results),

        );
  }

}