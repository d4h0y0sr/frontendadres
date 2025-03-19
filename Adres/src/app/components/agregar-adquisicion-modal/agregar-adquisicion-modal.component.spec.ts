import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAdquisicionModalComponent } from './agregar-adquisicion-modal.component';

describe('AgregarAdquisicionModalComponent', () => {
  let component: AgregarAdquisicionModalComponent;
  let fixture: ComponentFixture<AgregarAdquisicionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAdquisicionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAdquisicionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
