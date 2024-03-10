import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersEditComponent } from './manufacturers-edit.component';

describe('ManufacturersEditComponent', () => {
  let component: ManufacturersEditComponent;
  let fixture: ComponentFixture<ManufacturersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturersEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManufacturersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
