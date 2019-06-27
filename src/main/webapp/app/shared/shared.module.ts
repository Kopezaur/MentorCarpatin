import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MentorCarpatinSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MentorCarpatinSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MentorCarpatinSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MentorCarpatinSharedModule {
  static forRoot() {
    return {
      ngModule: MentorCarpatinSharedModule
    };
  }
}
