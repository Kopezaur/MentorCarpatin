import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'person',
        loadChildren: './person/person.module#MentorCarpatinPersonModule'
      },
      {
        path: 'route',
        loadChildren: './route/route.module#MentorCarpatinRouteModule'
      },
      {
        path: 'route-performance',
        loadChildren: './route-performance/route-performance.module#MentorCarpatinRoutePerformanceModule'
      },
      {
        path: 'mountain-region',
        loadChildren: './mountain-region/mountain-region.module#MentorCarpatinMountainRegionModule'
      },
      {
        path: 'country',
        loadChildren: './country/country.module#MentorCarpatinCountryModule'
      },
      {
        path: 'report',
        loadChildren: './report/report.module#MentorCarpatinReportModule'
      },
      {
        path: 'rescue-service',
        loadChildren: './rescue-service/rescue-service.module#MentorCarpatinRescueServiceModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MentorCarpatinEntityModule {}
