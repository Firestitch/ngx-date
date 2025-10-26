import { ComponentRef, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewContainerRef, inject } from '@angular/core';

import { FsDateAgoComponent } from '../components/date-ago/date-ago.component';
import { FsDateAgoFactory } from '../services/date-ago-factory.service';


@Directive({
    selector: '[fsDateAgo]',
    standalone: true
})
export class FsDateAgoDirective implements OnInit, OnChanges {
  private fsDateAgoFactory = inject(FsDateAgoFactory);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);


  @Input() public date = null;
  @Input() public showTime = false;
  @Input() public format = 'date';

  private dateAgoRef: ComponentRef<FsDateAgoComponent> = null;

  public ngOnInit() {
  }

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
