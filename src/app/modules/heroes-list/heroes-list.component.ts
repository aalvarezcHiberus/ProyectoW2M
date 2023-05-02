import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ENDPOINTS } from 'src/app/core/config/constants';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DetailDialogComponent } from 'src/app/shared/dialogs/detail-dialog/detail-dialog.component';
import { HeroModel } from 'src/app/shared/models/heroes/hero';
import { HeroDTO } from 'src/app/shared/models/heroes/hero.dto';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { ShowMessageService } from 'src/app/shared/services/show-message.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'alterego', 'humano', 'acciones'];
  dataSource: MatTableDataSource<HeroModel> = new MatTableDataSource();
  totalRows: number;

  constructor(
    private readonly heroService: HeroesService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly showService: ShowMessageService,
    private readonly translate: TranslateService
    ) {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.heroService.getAllSuperHeroes().subscribe((heroModelList: Array<HeroModel>) => 
      this.dataSource.data = heroModelList.map((hero: HeroDTO) => new HeroModel(hero))
    );
  }

  deleteData(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {message: 'CONFIRM_DIALOG.NOT_UNDO'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHeroById(id).subscribe({
          next: () => {
            this.getData();
            this.showService.showInfoSnackBar(this.translate.instant('HERO_LIST.DELETE_SUCCESS'), 3000);
          },
          error: (e) => this.showService.showInfoSnackBar(this.translate.instant('HERO_LIST.PROBLEM'), 3000)
        });
      }
    });
  }

  showData(data: HeroModel[]) {
    this.dataSource.data = data;
  }

  showDetailData(data: HeroModel) {
    this.dialog.open(DetailDialogComponent, {
      data,
      width: '65rem',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigate(hero: HeroModel) {
    this.router.navigate([ENDPOINTS.FORMHEROES], { state: { hero } });
  }
}
