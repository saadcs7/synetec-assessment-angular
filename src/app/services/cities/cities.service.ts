import { Injectable } from "@angular/core";
import { CitiesEndpoint } from "./cities-endpoint.service";
import { ICity } from "../../models/city.model";

@Injectable()
export class CitiesService {
    constructor(private _citiesEndpoint: CitiesEndpoint) {}
    getCities(){
        return this._citiesEndpoint.getCities<ICity>();
    }
    deleteCity(id: number){
        return this._citiesEndpoint.deleteCity(id);
    }
    getCity(id: number) {
        return this._citiesEndpoint.getCity<ICity>(id);
    }
}
