import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize, delay } from "rxjs/operators";
import { BusyService } from "../services/busy.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private busyService: BusyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.busyService.busy();
       return next.handle(req).pipe(
           delay(100), 
           finalize(() => {
                this.busyService.idle();
           })
        );
    }    
}