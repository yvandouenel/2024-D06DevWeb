import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskComponent } from './form-task.component';

describe('FormTaskComponent', () => {
  let component: FormTaskComponent;
  let fixture: ComponentFixture<FormTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
