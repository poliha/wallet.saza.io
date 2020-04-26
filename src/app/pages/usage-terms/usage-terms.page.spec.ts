import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsageTermsPage } from './usage-terms.page';

describe('UsageTermsPage', () => {
  let component: UsageTermsPage;
  let fixture: ComponentFixture<UsageTermsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTermsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsageTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
