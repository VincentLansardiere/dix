import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-search-associations',
  templateUrl: './search-associations.component.html',
  styles: []
})
export class SearchAssociationsComponent implements OnInit {

    msgBidon = 'test';
    listBidon = [ 'titi', 'toto'];

  constructor() { }

  ngOnInit() {
  }

}
