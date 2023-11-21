import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './containers/partners/partners.component';
import { partnerResolver } from './guards/partner.resolver';
import { PartnerFormComponent } from './containers/partner-form/partner-form.component';

const routes: Routes = [
  { path: '', component: PartnersComponent },
  { path: 'new', component: PartnerFormComponent, resolve: { partner: partnerResolver } },
  { path: 'edit/:_id', component: PartnerFormComponent, resolve: { partner: partnerResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
