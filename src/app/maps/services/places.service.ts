import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

	private placesApi: PlacesApiClient = inject(PlacesApiClient);
	private mapService: MapService = inject(MapService);
	public useLocation?: [number, number];
	public isLoadingPlaces: boolean = false;
	public places: Feature[] = [];

  constructor() {
		this.getUserLocation();
	}

	get isUserLocationReady(): boolean {
		return !!this.useLocation;
	}

	public async getUserLocation(): Promise<[number, number]>{
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				( {coords} ) => {
					this.useLocation = [coords.longitude, coords.latitude]
					//resolve([coords.longitude, coords.latitude])
					 resolve(this.useLocation);
				},
				(error) => {
					alert('No se pudo obtener la geolocalización');
					console.log(error);
					reject();
				}
			)
		});
	}

	getPlacesByQuery(query: string = ''){

		if( query.length === 0) {
			this.places =  [];
			this.isLoadingPlaces = false;
			return;
		}

		if(!this.useLocation) throw Error('No hay userLocation');

		this.isLoadingPlaces = true;

		this.placesApi.get<PlacesResponse>(query, {
			params: {
				proximity: this.useLocation?.join(','),
			}
		})
			.subscribe(resp => {
				this.isLoadingPlaces = false;
				this.places = resp.features;
				this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
			})
	}

	deletePlaces(){
		this.places = [];
	}


}
