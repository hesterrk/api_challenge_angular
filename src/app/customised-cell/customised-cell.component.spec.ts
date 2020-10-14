import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomisedCellComponent } from './customised-cell.component';

describe('CustomisedCellComponent', () => {
  let component: CustomisedCellComponent;
  let fixture: ComponentFixture<CustomisedCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomisedCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomisedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
