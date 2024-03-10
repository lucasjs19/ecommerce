import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersNewComponent } from './manufacturers-new.component';

describe('ManufacturersNewComponent', () => {
  let component: ManufacturersNewComponent;
  let fixture: ComponentFixture<ManufacturersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturersNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManufacturersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
