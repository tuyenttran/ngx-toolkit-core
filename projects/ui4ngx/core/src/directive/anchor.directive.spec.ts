import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxAnchorService } from '../service/anchor.service';
import { NgxAnchorDirective } from './anchor.directive';

@Component({
    selector: 'ngx-test-component',
    template: `<div class="mytag" [ngxAnchor]="'anchor-1'">test</div>`
})
export class TestComponent {}

describe('NgxAnchorDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                NgxAnchorDirective
            ],
            providers: [
                NgxAnchorService
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        // trigger change detection so that UI renders and you can access element in next step.
        fixture.detectChanges();
    });
    it('should create an instance', () => {
        const directiveEl: DebugElement = fixture.debugElement.query(By.directive(NgxAnchorDirective));
        expect(directiveEl).not.toBeNull();

        const directiveInstance: NgxAnchorDirective = directiveEl.injector.get(NgxAnchorDirective);
        expect(directiveInstance).toBeTruthy();
        expect(directiveInstance.anchorId).toBe('anchor-1');
    });
});
