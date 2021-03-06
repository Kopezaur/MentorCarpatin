import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRoutePerformance } from 'app/shared/model/route-performance.model';
import { AccountService } from 'app/core';
import { RoutePerformanceService } from './route-performance.service';

@Component({
  selector: 'jhi-route-performance',
  templateUrl: './route-performance.component.html'
})
export class RoutePerformanceComponent implements OnInit, OnDestroy {
  routePerformances: IRoutePerformance[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected routePerformanceService: RoutePerformanceService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.routePerformanceService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRoutePerformance[]>) => res.ok),
          map((res: HttpResponse<IRoutePerformance[]>) => res.body)
        )
        .subscribe((res: IRoutePerformance[]) => (this.routePerformances = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.routePerformanceService
      .query()
      .pipe(
        filter((res: HttpResponse<IRoutePerformance[]>) => res.ok),
        map((res: HttpResponse<IRoutePerformance[]>) => res.body)
      )
      .subscribe(
        (res: IRoutePerformance[]) => {
          this.routePerformances = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRoutePerformances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRoutePerformance) {
    return item.id;
  }

  registerChangeInRoutePerformances() {
    this.eventSubscriber = this.eventManager.subscribe('routePerformanceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
