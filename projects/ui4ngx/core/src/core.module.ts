import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxAnchorDirective } from './directive/anchor.directive';
import { NgxAnchorService } from './service/anchor.service';
import { NgxComponentService } from './service/component.service';

@NgModule({
    declarations: [
        NgxAnchorDirective
    ],
    imports: [
        CommonModule
    ]
})
export class NgxUiCoreModule {
    static forRoot(): ModuleWithProviders<NgxUiCoreModule> {
        return {
            ngModule: NgxUiCoreModule,
            providers: [
                NgxAnchorService,
                NgxComponentService
            ],
        };
    }
}