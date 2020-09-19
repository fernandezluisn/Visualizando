import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoFotosPage } from './listado-fotos.page';

describe('ListadoFotosPage', () => {
  let component: ListadoFotosPage;
  let fixture: ComponentFixture<ListadoFotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoFotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
