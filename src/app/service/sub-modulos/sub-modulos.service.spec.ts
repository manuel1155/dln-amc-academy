import { TestBed } from '@angular/core/testing';

import { SubModulosService } from './sub-modulos.service';

describe('SubModulosService', () => {
  let service: SubModulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubModulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
