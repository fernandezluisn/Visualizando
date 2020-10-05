import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeoPage } from './feo.page';

describe('FeoPage', () => {
  let component: FeoPage;
  let fixture: ComponentFixture<FeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
