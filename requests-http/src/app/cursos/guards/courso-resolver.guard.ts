import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos';
import { Cursos2Service } from '../cursos2.service';

@Injectable({
  providedIn: 'root'
})
export class CoursoResolverGuard implements Resolve<Curso> {

  constructor(private service: Cursos2Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params.id) {
      return this.service.loadById(route.params.id);
    }
    else {
      return of({ id: null, nome: null });
    }
  }
}
