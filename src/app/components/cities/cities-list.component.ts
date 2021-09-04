import { Component, OnInit } from "@angular/core";
import { ICity } from "../../models/city.model";
import { CitiesService } from '../../services/cities/cities.service';

@Component ({
    selector: 'cities-list',
    templateUrl: './cities-list.component.html',
    styleUrls: ['./cities-list.component.css']
})

export class CitiesListComponent implements OnInit {

    constructor(private citiesService: CitiesService) {}
 
    cities: ICity[];
    coulmns=[
      {"dataField":"Name","label":"City Name","Sortable":true},
      {"dataField":"Description","label":"Description","Sortable":true},
      {"dataField":"Delete","label":"Delete","Sortable":false}
    ];
    ngOnInit(): void {
        this.getCities();
    }
    getCities():void{
        this.citiesService.getCities().subscribe((data) => {
            this.cities = data;
            this.cities.sort((a,b) => a.name.localeCompare(b.name));
          });
    }
    deleteCity(id:number): void {
        this.citiesService.deleteCity(id).subscribe((data) => {
            /* update the data after delete it through API - */
            //this.getCities();
          });
          this.cities = this.cities.filter(p => {
            return p.id != id
          });
    }
    confirmDialog(id:number,name: string) {
      if(confirm("Are you sure to delete the city  \""+name+"\"")) {
        this.deleteCity(id);
      }
    }
    checkIfNoCities() {
        if(this.cities !=null)
        {
            if(this.cities.length <=0)
                return false;
            else 
                return true;
        }
        else
          return false;
    }
    sortCities(obj:any): void {
        if(obj.currentTarget.ariaSort=="true" && this.checkIfNoCities())
        {
            var currentClass= obj.currentTarget.className;
            this.resetSorting(obj.currentTarget.ariaValueNow,obj);
            if(obj.currentTarget.ariaValueNow=="Name" && obj.currentTarget.ariaSort=="true")
            {
                if(currentClass=="DESC")
                {
                this.cities.sort((a,b) => a.name.localeCompare(b.name));
                obj.currentTarget.className="ASC";
                }
                else
                {
                this.cities.sort((a,b) => b.name.localeCompare(a.name));
                obj.currentTarget.className="DESC";
                }
            }
            else if(obj.currentTarget.ariaValueNow=="Description" && obj.currentTarget.ariaSort=="true")
            {
                if(currentClass=="DESC")
                {
                    this.cities.sort((a,b) => b.description.localeCompare(a.description));
                    obj.currentTarget.className="ASC";
                }
                else
                {
                    this.cities.sort((a,b) => a.description.localeCompare(b.description));
                    obj.currentTarget.className="DESC";
                }
            }
        }
        else
            this.resetSorting("",obj);
    }
    resetSorting(column:string,obj:any)
    {
      for (var child of obj.currentTarget.parentElement.children) 
      {
        if(column!=child.ariaValueNow && child.ariaSort=="true")
        {
          child.className="SORT";
        }
      }
    }
}
