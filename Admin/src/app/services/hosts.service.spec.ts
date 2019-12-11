import { TestBed } from '@angular/core/testing';

import { HostsService } from './hosts.service';

describe('HostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostsService = TestBed.get(HostsService);
    expect(service).toBeTruthy();
  });
});
