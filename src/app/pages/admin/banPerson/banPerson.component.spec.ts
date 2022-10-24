/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BanPersonComponent } from './banPerson.component';

describe('BanPersonComponent', () => {
  let component: BanPersonComponent;
  let fixture: ComponentFixture<BanPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
