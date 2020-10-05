import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-botones',
  templateUrl: './botones.page.html',
  styleUrls: ['./botones.page.scss'],
})
export class BotonesPage implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit() {
  }

  lindo(){
    this.router.navigate(['subir-foto']);
  }

  feo(){
    this.router.navigate(['feo']);
  }

}
