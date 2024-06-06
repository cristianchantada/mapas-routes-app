import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

	@ViewChild('mapDiv')
	mapDivElement!: ElementRef

	private placesService: PlacesService = inject(PlacesService);
	private mapService: MapService = inject(MapService);

	ngAfterViewInit(): void {
		if(!this.placesService.useLocation) throw new Error("No hay placesService.userLocation");

		const map = new Map({
			container: this.mapDivElement.nativeElement,
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: this.placesService.useLocation,  //[-7.7725696, 42.6082304], // starting position [lng, lat]
			zoom: 14, // starting zoom
		});

		const popup = new Popup()
			.setHTML(`
				<h6>Aquí estoy</h6>
				<span>Estoy en este lugar del mundo</span>
			`);

		new Marker({color: 'red'})
			.setLngLat(this.placesService.useLocation)
			.setPopup(popup)
			.addTo(map);

		this.mapService.setMap(map);

	}


}
