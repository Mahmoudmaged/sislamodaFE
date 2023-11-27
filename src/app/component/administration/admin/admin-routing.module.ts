import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialManagementComponent } from '../../financial-management/financial-management.component';
import { OrderManagementComponent } from '../../order-management/order-management.component';
import { VendorManagementComponent } from '../../vendor-management/vendor-management.component';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { SalesManagementComponent } from '../../sales-management/sales-management.component';
import { VendorProfileComponent } from '../../vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from '../../financial-management-report/financial-management-report.component';
import { SettingsManagementComponent } from '../../settings-management/settings-management.component';
import { NotAvailableComponent } from '../../not-available/not-available.component';
import { OrderDetailsComponent } from '../../order-details/order-details.component';
import { ProductComponent } from '../../product/product.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { AddProductComponent } from '../../add-product/add-product.component';
import { EditProductComponent } from '../../edit-product/edit-product.component';
import { CategoryComponent } from '../../category/category.component';
import { AddCategoryComponent } from '../../add-category/add-category.component';
import { AddSubcategoryComponent } from '../../add-subcategory/add-subcategory.component';
import { CategoryDetailsComponent } from '../../category-details/category-details.component';
import { EditCategoryComponent } from '../../edit-category/edit-category.component';
import { EditSubcategoryComponent } from '../../edit-subcategory/edit-subcategory.component';
import { OfferComponent } from '../../offer/offer.component';
import { AddOfferComponent } from '../../add-offer/add-offer.component';
import { EditOfferComponent } from '../../edit-offer/edit-offer.component';
import { OfferDetailsComponent } from '../../offer-details/offer-details.component';
import { VendorProfileDetailsComponent } from '../../vendor-profile-details/vendor-profile-details.component';
import { BrandManagementComponent } from '../../Brand/brand-management/brand-management.component';
import { AddBrandComponent } from '../../Brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from '../../Brand/update-brand/update-brand.component';
import { DisplayBrandComponent } from '../../Brand/display-brand/display-brand.component';

const routes: Routes = [
  { path: 'financial', component: FinancialManagementComponent },
  { path: 'financial/:id/report', component: FinancialManagementReportComponent },
  { path: 'order', component: OrderManagementComponent },
  { path: 'order/:id/details', component: OrderDetailsComponent },
  { path: 'user', component: UserManagementComponent },
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
  { path: "**", component: NotAvailableComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
