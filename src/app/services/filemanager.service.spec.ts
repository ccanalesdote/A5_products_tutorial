import { TestBed, inject } from '@angular/core/testing';

import { FilemanagerService } from './filemanager.service';

describe('FilemanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilemanagerService]
    });
  });

  it('should be created', inject([FilemanagerService], (service: FilemanagerService) => {
    expect(service).toBeTruthy();
  }));
});
