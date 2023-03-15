import { AfterContentInit, Directive, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgxAnchorService } from '../service/anchor.service';
import { v4 as uuidv4 } from 'uuid';

 @Directive({selector: '[ngxAnchor]'})
export class NgxAnchorDirective implements AfterContentInit, OnDestroy {

     // -------------------------------------------------------------------------
     // Inputs / Outputs
     // -------------------------------------------------------------------------

     @Input('ngxAnchor')
     public anchorId: string;

     // -------------------------------------------------------------------------
     // Constructor
     // -------------------------------------------------------------------------

     constructor(private _viewContainer: ViewContainerRef,
                 private _anchorService: NgxAnchorService) {
     }

     // -------------------------------------------------------------------------
     // Lifecycle callbacks
     // -------------------------------------------------------------------------

     // implements AfterContentInit
     ngAfterContentInit(): void {
         // if id is not passed via directive, then use the element id
         if (this.anchorId === undefined || this.anchorId.length === 0) {
             this.anchorId = this._viewContainer.element.nativeElement.id;
         }
         // if the element id is not set, then create an ID and save as element data attribute
         if (this.anchorId === undefined || this.anchorId.length === 0) {
             this.anchorId = uuidv4();
             this._viewContainer.element.nativeElement.setAttribute('data-anchor-id', this.anchorId);
         }
         // console.log('Anchor ID=' + this.anchorId +', viewContainer=', this._viewContainer);
         this._anchorService.register(this.anchorId, this._viewContainer);
     }

     // implements OnDestroy
     ngOnDestroy(): void {
         this._anchorService.deregister(this.anchorId);
     }
 }
