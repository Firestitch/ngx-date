import { Directive, Inject, Input, ElementRef, Renderer2, ViewContainerRef,
  ComponentRef, OnInit, OnChanges } from '@angular/core';

import { FsDateAgoComponent } from '../components/fs-date-ago/fs-date-ago.component';
import { FsDateAgoFactory } from '../services/fs-date-ago-factory.service';


@Directive({
  selector: '[fsDateAgo]'
})
export class FsDateAgoDirective implements OnInit, OnChanges {

  @Input() public date = null;
  @Input() public showTime = false;
  @Input() public format = 'date';

  private dateAgoRef: ComponentRef<FsDateAgoComponent> = null;

  constructor(
    private fsDateAgoFactory: FsDateAgoFactory,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(ViewContainerRef) private viewContainerRef
  ) { }

  public ngOnInit() { }

  public ngOnChanges() {
    this.renderDateAgo();
  }

  private renderDateAgo() {
    this.removeDateAgo();
    this.fsDateAgoFactory.setRootViewContainerRef(this.viewContainerRef);
    this.dateAgoRef = this.fsDateAgoFactory.addDynamicComponent();
    Object.assign(this.dateAgoRef.instance, {
      date: this.date,
      showTime: this.showTime,
      format: this.format
    });
  }

  private removeDateAgo() {
    if (this.dateAgoRef) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.dateAgoRef.instance.elementRef.nativeElement);
    }
  }

}
