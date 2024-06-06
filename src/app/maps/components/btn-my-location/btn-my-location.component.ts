import { Component, inject } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

	private mapService: MapService = inject(MapService);
	private placeService: PlacesService = inject(PlacesService);

	goToMyLocation(){

		if(!this.placeService.isUserLocationReady) throw Error('No hay ubicación de usuario');
		if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');

		this.mapService.flyTo(this.placeService.useLocation!);

	}

}
