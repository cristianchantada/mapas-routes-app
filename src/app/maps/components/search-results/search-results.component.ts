import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature, Properties, Coordinates } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

	public selectedId: string = '';

	private placesService: PlacesService = inject(PlacesService);
	private mapService: MapService = inject(MapService);

	get isLoadingPlaces(): boolean{
		return this.placesService.isLoadingPlaces;
	}

	get places(): Feature[] {
		return this.placesService.places;
	}

	flyTo(place: Feature){
		this.selectedId = place.id;
		const{longitude, latitude} = place.properties.coordinates;
		this.mapService.flyTo([longitude, latitude]);
	}

	getDirections(place: Feature){

		if(!this.placesService.useLocation) throw Error('No hay userLocation')

		this.placesService.deletePlaces();

		const start = this.placesService.useLocation;
		const end: [number, number] = [place.properties.coordinates.longitude, place.properties.coordinates.latitude]

		this.mapService.getRouteBetweenPoints(start, end);
	}


}
