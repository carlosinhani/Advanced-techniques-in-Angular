import { TestBed } from '@angular/core/testing';

import { ValidarCamposService } from './validar-campos.service';

describe('ValidarCamposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidarCamposService = TestBed.get(ValidarCamposService);
    expect(service).toBeTruthy();
  });
});
