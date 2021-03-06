import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';

export function filterResponse<T>() {
    return pipe(
        filter((event: HttpEvent<Object>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    )
}

export function uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((event.loaded * 100) / event.total));
        }
    });
}