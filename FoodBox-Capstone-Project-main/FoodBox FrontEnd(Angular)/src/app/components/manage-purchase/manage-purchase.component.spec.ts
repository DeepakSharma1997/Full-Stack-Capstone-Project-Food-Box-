import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseComponent } from './manage-purchase.component';

describe('ManagePurchaseComponent', () => {
  let component: ManagePurchaseComponent;
  let fixture: ComponentFixture<ManagePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
