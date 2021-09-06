import { Injectable, Injector } from "@angular/core";
import { BaseService } from "../base.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CitiesEndpoint extends BaseService {
    constructor(protected _httpClient: HttpClient, private _injector: Injector) {
        super(_httpClient, _injector);
    }
    getCities<city>(): Observable<city[]> {
        return this.Http.get<city[]>(this.BaseUrl + 'cities');
    }
    deleteCity(id: number){
        return this.Http.delete(this.BaseUrl + 'cities/delete-city/' + id);
    }
    async getCity<city>(id: number): Promise<city> {
        return await this.Http.get<city>(this.BaseUrl+ 'cities/' + id).toPromise();
    }
}
