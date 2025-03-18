import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdquisitionComponent } from './home-adquisition.component';

describe('HomeAdquisitionComponent', () => {
  let component: HomeAdquisitionComponent;
  let fixture: ComponentFixture<HomeAdquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdquisitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
