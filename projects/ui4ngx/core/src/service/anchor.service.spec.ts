import { TestBed } from '@angular/core/testing';
import { NgxAnchorService } from './anchor.service';

describe('NgxAnchorService', () => {
    let service: NgxAnchorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxAnchorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
