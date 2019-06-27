import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { AccountService } from 'app/core';
import { ReportService } from './report.service';

@Component({
  selector: 'jhi-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit, OnDestroy {
  reports: IReport[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected reportService: ReportService,
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
      this.reportService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IReport[]>) => res.ok),
          map((res: HttpResponse<IReport[]>) => res.body)
        )
        .subscribe((res: IReport[]) => (this.reports = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.reportService
      .query()
      .pipe(
        filter((res: HttpResponse<IReport[]>) => res.ok),
        map((res: HttpResponse<IReport[]>) => res.body)
      )
      .subscribe(
        (res: IReport[]) => {
          this.reports = res;
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
    this.registerChangeInReports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReport) {
    return item.id;
  }

  registerChangeInReports() {
    this.eventSubscriber = this.eventManager.subscribe('reportListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
