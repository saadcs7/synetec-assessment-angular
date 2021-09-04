import { Injectable, Injector } from "@angular/core";
import { BaseService } from "../base.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { ICity } from "../../models/city.model";

@Injectable()
export class CitiesEndpoint extends BaseService {
    constructor(protected _httpClient: HttpClient, private _injector: Injector) {
        super(_httpClient, _injector);
    }
    getCities(): Observable<ICity[]> {
        return this.Http.get<ICity[]>(this.BaseUrl + 'cities');
    }
    deleteCity(id: number){
        return this.Http.delete(this.BaseUrl + 'cities/delete-city/' + id);
    }
    async getCity(id: number): Promise<ICity> {
        return await this.Http.get<ICity>(this.BaseUrl+ 'cities/' + id).toPromise();
    }
}
