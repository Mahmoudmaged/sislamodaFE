import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { OrderManagementComponent } from './component/order/order-management/order-management.component';
import { VendorManagementComponent } from './component/vendor/vendor-management/vendor-management.component';
import { from } from 'rxjs';
import { UserManagementComponent } from './component/admin-user-management/user-management/user-management.component';
import { SalesManagementComponent } from './component/sales/sales-management/sales-management.component';
import { FinancialManagementComponent } from './component/financial/financial-management/financial-management.component';
import { SettingsManagementComponent } from './component/settings-management/settings-management.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { VendorProfileComponent } from './component/vendor/vendor-profile/vendor-profile.component';
import { FinancialManagementReportComponent } from './component/financial/financial-management-report/financial-management-report.component';
import { NotAvailableComponent } from './component/not-available/not-available.component';
import { VendorLoginComponent } from './component/vendor/vendor-login/vendor-login.component';
import { OrderDetailsComponent } from './component/order/order-details/order-details.component';
import { ProductComponent } from './component/productComponent/product/product.component';
import { ProductDetailsComponent } from './component/productComponent/product-details/product-details.component';
import { AddProductComponent } from './component/productComponent/add-product/add-product.component';
import { EditProductComponent } from './component/productComponent/edit-product/edit-product.component';
import { CategoryComponent } from './component/categoryComponent/category/category.component';
import { AddCategoryComponent } from './component/categoryComponent/add-category/add-category.component';
import { EditCategoryComponent } from './component/categoryComponent/edit-category/edit-category.component';
import { AddSubcategoryComponent } from './component/subcategoryCompontent/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './component/subcategoryCompontent/edit-subcategory/edit-subcategory.component';
import { SubcategoryComponent } from './component/subcategoryCompontent/subcategory/subcategory.component';
import { CategoryDetailsComponent } from './component/categoryComponent/category-details/category-details.component';
import { DropdownModule ,  } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OfferComponent } from './component/offerComponent/offer/offer.component';
import { AddOfferComponent } from './component/offerComponent/add-offer/add-offer.component';
import { EditOfferComponent } from './component/offerComponent/edit-offer/edit-offer.component';
import { OfferDetailsComponent } from './component/offerComponent/offer-details/offer-details.component';
import { RegisterVendorComponent } from './component/vendor/register-vendor/register-vendor.component';
import { VendorProfileDetailsComponent } from './component/vendor/vendor-profile-details/vendor-profile-details.component';
import { UserLoginComponent } from './component/UserComponents/userLogin/user-login.component';
import { UserRegisterComponent } from './component/UserComponents/user-register/user-register.component';
import { LandingPageComponent } from './component/UserComponents/landing-page/landing-page.component';
import { FooterComponent } from './component/UserComponents/footer/footer.component';
import { NavBarComponent } from './component/UserComponents/nav-bar/nav-bar.component';
import { EditOrderComponent } from './component/order/edit-order/edit-order.component';
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
import { NotificationManagementComponent } from './component/Notification/notification-management/notification-management.component';
import { AddNotificationComponent } from './component/Notification/add-notification/add-notification.component';
import { UpdateNotificationComponent } from './component/Notification/update-notification/update-notification.component';
import { DisplayNotificationComponent } from './component/Notification/display-notification/display-notification.component';
import { TicketManagementComponent } from './component/ticket/ticket-management/ticket-management.component';
import { DisplayTicketComponent } from './component/ticket/display-ticket/display-ticket.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CarouselModule } from 'primeng/carousel';
import { UpdateUserComponent } from './component/admin-user-management/update-user/update-user.component';
import { ChatComponent } from './component/chat/chat.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddUserComponent } from './component/admin-user-management/add-user/add-user.component';
import { AddTicketComponent } from './component/ticket/add-ticket/add-ticket.component';
import { EditTicketComponent } from './component/ticket/edit-ticket/edit-ticket.component';
import { CouponComponent } from './component/Coupon/coupon/coupon.component';
import { CouponDetailsComponent } from './component/Coupon/coupon-details/coupon-details.component';
import { EditcouponComponent } from './component/Coupon/editcoupon/editcoupon.component';
import { AddcouponComponent } from './component/Coupon/addcoupon/addcoupon.component';
import { InfluencerComponent } from './component/influencer/influencer/influencer.component';
import { AddInfluencerComponent } from './component/influencer/add-influencer/add-influencer.component';
import { EditInfluencerComponent } from './component/influencer/edit-influencer/edit-influencer.component';
import { InfluencerDetailsComponent } from './component/influencer/influencer-details/influencer-details.component';
import { CountryComponent } from './component/country/country/country.component';
import { AddCountryComponent } from './component/country/add-country/add-country.component';
import { UpdateCountryComponent } from './component/country/update-country/update-country.component';


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
    DisplayOptionComponent,
    NotificationManagementComponent,
    AddNotificationComponent,
    UpdateNotificationComponent,
    DisplayNotificationComponent,
    TicketManagementComponent,
    DisplayTicketComponent,
    DashboardComponent,
    UpdateUserComponent,
    ChatComponent,
    AddUserComponent,
    AddTicketComponent,
    EditTicketComponent,
    CouponComponent,
    CouponDetailsComponent,
    EditcouponComponent,
    AddcouponComponent,
    InfluencerComponent,
    AddInfluencerComponent,
    EditInfluencerComponent,
    InfluencerDetailsComponent,
    CountryComponent,
    AddCountryComponent,
    UpdateCountryComponent
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
    ColorPickerModule,
    CarouselModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
