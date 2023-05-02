import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroModel } from 'src/app/shared/models/heroes/hero';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import {Location} from '@angular/common';
import { ShowMessageService } from 'src/app/shared/services/show-message.service';
import { Superpoder } from 'src/app/shared/models/heroes/hero.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent {
  hero: HeroModel;
  heroForm: FormGroup;
  title: string;
  superpoder: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly heroesService: HeroesService,
    private readonly showService: ShowMessageService,
    private readonly location: Location,
    private readonly translate: TranslateService,
  ) {
    this.getHero();
    this.initForm();
    this.superpoder = Superpoder;
  }

  private getHero(): void {
    const hero = this.router.getCurrentNavigation()?.extras.state?.['hero'];
    if (hero) {
      this.title = 'HERO_FORM.TITLE_NEW';
      this.hero = hero;
    } else {
      this.title = 'HERO_FORM.TITLE_UPDATE';
    }
  }

  private initForm() {
    this.heroForm = this.fb.group({
      name: [this.hero ? this.hero.nombre : null,
        [Validators.required,
        Validators.minLength(4)]
      ],
      alterEgo: [this.hero ? this.hero.alterego : null],
      power: [this.hero ? this.hero.superpoder : null, Validators.required],
      weakness: [this.hero ? this.hero.debilidades : null],
      sex: [this.hero ? this.hero.sexo : null],
      human: [this.hero ? this.hero.humano : false]
    }, { validators: this.geneticValidator() });
  }

  private geneticValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const sex = group.get('sex')?.value;
      const human = group.get('human')?.value;

      return (!!sex || !!human) ? null : { ambosVacios: true };
    };
  }

  onSubmit() {
    if (this.hero?.id) {
      this.heroesService.updateSuperHeroe(this.createHero()).subscribe({
        next: () => this.showService.showInfoSnackBar(this.translate.instant('HERO_FORM.UPDATE_SUCCESS'), 3000),
        error: () => this.showService.showInfoSnackBar(this.translate.instant('HERO_FORM.UPDATE_ERROR'), 3000),
        complete: () => this.router.navigate(['heroes'])
      });
    } else {
      this.heroesService.addSuperHeroe(this.createHero()).subscribe({
        next: () => this.showService.showInfoSnackBar(this.translate.instant('HERO_FORM.ADD_SUCCESS'), 3000),
        error: () => this.showService.showInfoSnackBar(this.translate.instant('HERO_FORM.ADD_ERROR'), 3000),
        complete: () => this.router.navigate(['heroes'])
      });
    }
  }

  private createHero(): HeroModel {
    return {
      id: this.hero?.id,
      nombre: this.heroForm.get('name')?.value,
      alterego: this.heroForm.get('alterEgo')?.value,
      debilidades: this.heroForm.get('weakness')?.value,
      humano: this.heroForm.get('human')?.value, 
      superpoder: this.heroForm.get('power')?.value,  
      sexo: this.heroForm.get('sex')?.value,
    }
  }

  getErrorMessage() {
    if (!this.heroForm.get('name')?.hasError('required')) {
      return 'HERO_FORM.FORM.MIN_LENGTH';
    }
    return 'HERO_FORM.FORM.REQUIRED';
  }

  goBack(): void {
    this.location.back();
  }

}
