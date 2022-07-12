import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actividades-table',
  templateUrl: './actividades-table.component.html',
  styleUrls: ['./actividades-table.component.css']
})
export class ActividadesTableComponent implements OnInit {

  buscador : string = '';

  formBuscador: FormGroup = this.fb.group({
    buscador: ['']
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
