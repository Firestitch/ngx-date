import { ComponentFactoryResolver, Injectable, inject } from '@angular/core';

import { FsDateAgoComponent } from '../components/date-ago/date-ago.component';


@Injectable()
export class FsDateAgoFactory {

  private factoryResolver = null;
  private rootViewContainer = null;

  constructor() {
    const factoryResolver = inject(ComponentFactoryResolver);

    this.factoryResolver = factoryResolver;
  }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(FsDateAgoComponent);

    const component = factory
      .create(this.rootViewContainer.injector);

    this.rootViewContainer.insert(component.hostView);

    return component;
  }

}
