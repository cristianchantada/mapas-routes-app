import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: ``
})
export class MapScreenComponent {

	private placesService: PlacesService = inject(PlacesService);

	get isUserLocationReady(){
		return this.placesService.isUserLocationReady;
	}

}
