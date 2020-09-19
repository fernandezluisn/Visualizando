import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFotoPage } from './subir-foto.page';

describe('SubirFotoPage', () => {
  let component: SubirFotoPage;
  let fixture: ComponentFixture<SubirFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
