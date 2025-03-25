import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoSubmoduloComponent } from './contenido-submodulo.component';

describe('ContenidoSubmoduloComponent', () => {
  let component: ContenidoSubmoduloComponent;
  let fixture: ComponentFixture<ContenidoSubmoduloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoSubmoduloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoSubmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
