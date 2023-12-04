import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialManagementComponent } from '../../financial/financial-management/financial-management.component';
import { OrderManagementComponent } from '../../order/order-management/order-management.component';
import { VendorManagementComponent } from '../../vendor/vendor-management/vendor-management.component';
import { UserManagementComponent } from '../../admin-user-management/user-management/user-management.component';
import { SalesManagementComponent } from '../../sales/sales-management/sales-management.component';
import { VendorProfileComponent } from '../../vendor/vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from '../../financial/financial-management-report/financial-management-report.component';
import { SettingsManagementComponent } from '../../settings-management/settings-management.component';
import { NotAvailableComponent } from '../../not-available/not-available.component';
import { OrderDetailsComponent } from '../../order/order-details/order-details.component';
import { ProductComponent } from '../../productComponent/product/product.component';
import { ProductDetailsComponent } from '../../productComponent/product-details/product-details.component';
import { AddProductComponent } from '../../productComponent/add-product/add-product.component';
import { EditProductComponent } from '../../productComponent/edit-product/edit-product.component';
import { CategoryComponent } from '../../categoryComponent/category/category.component';
import { AddCategoryComponent } from '../../categoryComponent/add-category/add-category.component';
import { AddSubcategoryComponent } from '../../subcategoryCompontent/add-subcategory/add-subcategory.component';
import { CategoryDetailsComponent } from '../../categoryComponent/category-details/category-details.component';
import { EditCategoryComponent } from '../../categoryComponent/edit-category/edit-category.component';
import { EditSubcategoryComponent } from '../../subcategoryCompontent/edit-subcategory/edit-subcategory.component';
import { OfferComponent } from '../../offerComponent/offer/offer.component';
import { AddOfferComponent } from '../../offerComponent/add-offer/add-offer.component';
import { EditOfferComponent } from '../../offerComponent/edit-offer/edit-offer.component';
import { OfferDetailsComponent } from '../../offerComponent/offer-details/offer-details.component';
import { VendorProfileDetailsComponent } from '../../vendor/vendor-profile-details/vendor-profile-details.component';
import { BrandManagementComponent } from '../../Brand/brand-management/brand-management.component';
import { AddBrandComponent } from '../../Brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from '../../Brand/update-brand/update-brand.component';
import { DisplayBrandComponent } from '../../Brand/display-brand/display-brand.component';
import { OptionsetManagementComponent } from '../../optionSet/optionset-management/optionset-management.component';
import { AddOptionsetComponent } from '../../optionSet/add-optionset/add-optionset.component';
import { UpdateOptionsetComponent } from '../../optionSet/update-optionset/update-optionset.component';
import { DisplayOptionsetComponent } from '../../optionSet/display-optionset/display-optionset.component';
import { AddOptionSetItemComponent } from '../../optionSetItem/add-option-set-item/add-option-set-item.component';
import { UpdateOptionSetItemComponent } from '../../optionSetItem/update-option-set-item/update-option-set-item.component';
import { OptionsManagmentComponent } from '../../options/options-managment/options-managment.component';
import { AddOptionsComponent } from '../../options/add-options/add-options.component';
import { EditOptionsComponent } from '../../options/edit-options/edit-options.component';
import { NotificationManagementComponent } from '../../Notification/notification-management/notification-management.component';
import { AddNotificationComponent } from '../../Notification/add-notification/add-notification.component';
import { DisplayNotificationComponent } from '../../Notification/display-notification/display-notification.component';
import { UpdateNotificationComponent } from '../../Notification/update-notification/update-notification.component';
import { TicketManagementComponent } from '../../ticket/ticket-management/ticket-management.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UpdateUserComponent } from '../../admin-user-management/update-user/update-user.component';
import { DisplayTicketComponent } from '../../ticket/display-ticket/display-ticket.component';
import { AdministrationComponent } from '../administration.component';
import { EditOrderComponent } from '../../order/edit-order/edit-order.component';

const routes: Routes = [
  { path: 'financial', component: FinancialManagementComponent },
  { path: 'financial/:id/report', component: FinancialManagementReportComponent },
  { path: 'order', component: OrderManagementComponent },
  { path: 'order/:id/details', component: OrderDetailsComponent },
  { path: 'order/:id/edit', component: EditOrderComponent },
  { path: 'user', component: UserManagementComponent },
  { path: 'user/:id/update', component: UpdateUserComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id/details', component: ProductDetailsComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/:id/update', component: EditProductComponent },
  { path: 'vendor', component: VendorManagementComponent },
  { path: 'sales', component: SalesManagementComponent },
  { path: "vendor/:id/profile", component: VendorProfileComponent },
  { path: "vendor/profile/:id/details", component: VendorProfileDetailsComponent },
  { path: "settings", component: SettingsManagementComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/:id/details", component: CategoryDetailsComponent },
  { path: "category/:id/edit", component: EditCategoryComponent },
  { path: "category/:id/sub/edit", component: EditSubcategoryComponent },
  { path: "category/add", component: AddCategoryComponent },
  { path: "category/add/sub", component: AddSubcategoryComponent },
  { path: "offers", component: OfferComponent },
  { path: "offers/add", component: AddOfferComponent },
  { path: "offer/:id/edit", component: EditOfferComponent },
  { path: "offer/:id/details", component: OfferDetailsComponent },
  { path: "brand", component: BrandManagementComponent },
  { path: "brand/add", component: AddBrandComponent },
  { path: "brand/:id/update", component: UpdateBrandComponent },
  { path: "brand/:id/details", component: DisplayBrandComponent },


  
  { path: "optionSet", component: OptionsetManagementComponent },
  { path: "optionSet/add", component: AddOptionsetComponent },
  { path: "optionSet/:id/update", component: UpdateOptionsetComponent },
  { path: "optionSet/:id/details", component: DisplayOptionsetComponent },


  { path: "optionSet/item/add", component: AddOptionSetItemComponent },
  { path: "optionSet/item/:id/update", component: UpdateOptionSetItemComponent },

  { path: "options", component: OptionsManagmentComponent },
  { path: "options/add", component: AddOptionsComponent },
  { path: "options/:id/edit", component: EditOptionsComponent },

  { path: "notification", component: NotificationManagementComponent },
  { path: "notification/add", component: AddNotificationComponent },
  { path: "notification/:id/edit", component: UpdateNotificationComponent },
  { path: "notification/:id/display", component: DisplayNotificationComponent },


  { path: "ticket", component: TicketManagementComponent },
  { path: "ticket/:id/details", component: DisplayTicketComponent },
  { path: "dashboard", component: DashboardComponent },


  { path: "**", component: AdministrationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
