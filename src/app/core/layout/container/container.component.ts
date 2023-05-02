import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  loading: Subject<boolean> = this.loadService.isLoading;

  constructor(private readonly loadService: LoadingService) {

  }
}
