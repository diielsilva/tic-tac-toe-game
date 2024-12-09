import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOptionComponent } from './choose-option.component';

describe('ChooseOptionComponent', () => {
  let component: ChooseOptionComponent;
  let fixture: ComponentFixture<ChooseOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
