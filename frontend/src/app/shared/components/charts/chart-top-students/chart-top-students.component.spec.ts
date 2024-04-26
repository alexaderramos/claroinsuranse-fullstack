import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopStudentsComponent } from './chart-top-students.component';

describe('ChartTopStudentsComponent', () => {
  let component: ChartTopStudentsComponent;
  let fixture: ComponentFixture<ChartTopStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTopStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTopStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
