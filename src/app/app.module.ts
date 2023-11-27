import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { OrderManagementComponent } from './component/order-management/order-management.component';
import { VendorManagementComponent } from './component/vendor-management/vendor-management.component';
import { from } from 'rxjs';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { SalesManagementComponent } from './component/sales-management/sales-management.component';
import { FinancialManagementComponent } from './component/financial-management/financial-management.component';
import { SettingsManagementComponent } from './component/settings-management/settings-management.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { VendorProfileComponent } from './component/vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from './component/financial-management-report/financial-management-report.component';
import { NotAvailableComponent } from './component/not-available/not-available.component';
import { VendorLoginComponent } from './component/vendor-login/vendor-login.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { CategoryComponent } from './component/category/category.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { EditCategoryComponent } from './component/edit-category/edit-category.component';
import { AddSubcategoryComponent } from './component/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './component/edit-subcategory/edit-subcategory.component';
import { SubcategoryComponent } from './component/subcategory/subcategory.component';
import { CategoryDetailsComponent } from './component/category-details/category-details.component';
import { DropdownModule ,  } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OfferComponent } from './component/offer/offer.component';
import { AddOfferComponent } from './component/add-offer/add-offer.component';
import { EditOfferComponent } from './component/edit-offer/edit-offer.component';
import { OfferDetailsComponent } from './component/offer-details/offer-details.component';
import { RegisterVendorComponent } from './component/register-vendor/register-vendor.component';
import { VendorProfileDetailsComponent } from './component/vendor-profile-details/vendor-profile-details.component';
import { UserLoginComponent } from './component/UserComponents/userLogin/user-login.component';
import { UserRegisterComponent } from './component/UserComponents/user-register/user-register.component';
import { LandingPageComponent } from './component/UserComponents/landing-page/landing-page.component';
import { FooterComponent } from './component/UserComponents/footer/footer.component';
import { NavBarComponent } from './component/UserComponents/nav-bar/nav-bar.component';
import { EditOrderComponent } from './component/edit-order/edit-order.component';
import { BrandManagementComponent } from './component/Brand/brand-management/brand-management.component';
import { UpdateBrandComponent } from './component/Brand/update-brand/update-brand.component';
import { DeleteBrandComponent } from './component/Brand/delete-brand/delete-brand.component';
import { DisplayBrandComponent } from './component/Brand/display-brand/display-brand.component';
import { AddBrandComponent } from './component/Brand/add-brand/add-brand.component';
import { OptionsetManagementComponent } from './component/optionSet/optionset-management/optionset-management.component';
import { AddOptionsetComponent } from './component/optionSet/add-optionset/add-optionset.component';
import { UpdateOptionsetComponent } from './component/optionSet/update-optionset/update-optionset.component';
import { DisplayOptionsetComponent } from './component/optionSet/display-optionset/display-optionset.component';
import { DisplayOptionSetItemComponent } from './component/optionSetItem/display-option-set-item/display-option-set-item.component';
import { AddOptionSetItemComponent } from './component/optionSetItem/add-option-set-item/add-option-set-item.component';
import { UpdateOptionSetItemComponent } from './component/optionSetItem/update-option-set-item/update-option-set-item.component';
// import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerModule } from 'primeng/colorpicker';
import { OptionsManagmentComponent } from './component/options/options-managment/options-managment.component';
import { AddOptionsComponent } from './component/options/add-options/add-options.component';
import { EditOptionsComponent } from './component/options/edit-options/edit-options.component';
import { DisplayOptionComponent } from './component/options/display-option/display-option.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AdministrationComponent,
    OrderManagementComponent,
    VendorManagementComponent,
    UserManagementComponent,
    SalesManagementComponent,
    FinancialManagementComponent,
    SettingsManagementComponent,
    AdminLoginComponent,
    VendorProfileComponent,
    FinancialManagementReportComponent,
    NotAvailableComponent,
    VendorLoginComponent,
    OrderDetailsComponent,
    ProductComponent,
    ProductDetailsComponent,
    AddProductComponent,
    EditProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    SubcategoryComponent,
    CategoryDetailsComponent,
    OfferComponent,
    AddOfferComponent,
    EditOfferComponent,
    OfferDetailsComponent,
    RegisterVendorComponent,
    VendorProfileDetailsComponent,
    UserLoginComponent,
    UserRegisterComponent,
    LandingPageComponent,
    NavBarComponent,
    EditOrderComponent,
    BrandManagementComponent,
    UpdateBrandComponent,
    DeleteBrandComponent,
    DisplayBrandComponent,
    AddBrandComponent,
    OptionsetManagementComponent,
    AddOptionsetComponent,
    UpdateOptionsetComponent,
    DisplayOptionsetComponent,
    DisplayOptionSetItemComponent,
    AddOptionSetItemComponent,
    UpdateOptionSetItemComponent,
    OptionsManagmentComponent,
    AddOptionsComponent,
    EditOptionsComponent,
    DisplayOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    DropdownModule,
    MultiSelectModule,
    ColorPickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
