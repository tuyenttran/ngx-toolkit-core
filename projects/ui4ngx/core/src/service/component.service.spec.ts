import 'zone.js/dist/zone-testing';
import { TestBed } from '@angular/core/testing';
import { NgxAnchorService } from './anchor.service';
import { NgxComponentService } from './component.service';

describe('NgxComponentService', () => {
    let service: NgxComponentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgxAnchorService]
        });
        service = TestBed.inject(NgxComponentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
