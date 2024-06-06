import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

	private debounceTimer?: NodeJS.Timeout;
	private placesService: PlacesService = inject(PlacesService);


	onQueryChanged(query: string= ''){

		if(this.debounceTimer) clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			this.placesService.getPlacesByQuery(query);
		}, 350);

	}

}
