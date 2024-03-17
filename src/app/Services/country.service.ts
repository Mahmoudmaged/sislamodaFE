import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseURL = `https://sislimoda.com/api/Country/`;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
  }

  xx = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cabo Verde', code: 'CV' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo (Congo-Brazzaville)', code: 'CG' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czechia (Czech Republic)', code: 'CZ' },
    { name: 'Democratic Republic of the Congo', code: 'CD' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Eswatini (fmr. "Swaziland")', code: 'SZ' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Greece', code: 'GR' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Holy See', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia', code: 'FM' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar (formerly Burma)', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'North Korea', code: 'KP' },
    { name: 'North Macedonia', code: 'MK' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestine State', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' },
    { name: 'South Sudan', code: 'SS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syria', code: 'SY' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States of America', code: 'US' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ];

  countriesWithCodes = [
    {
      "code": "AF",
      "name": {
        "english": "Afghanistan",
        "arabic": "أفغانستان"
      }
    },
    {
      "code": "AX",
      "name": {
        "english": "Åland Islands",
        "arabic": "جزر آلاند"
      }
    },
    {
      "code": "AL",
      "name": {
        "english": "Albania",
        "arabic": "ألبانيا"
      }
    },
    {
      "code": "DZ",
      "name": {
        "english": "Algeria",
        "arabic": "الجزائر"
      }
    },
    {
      "code": "AS",
      "name": {
        "english": "American Samoa",
        "arabic": "ساموا الأمريكية"
      }
    },
    {
      "code": "AD",
      "name": {
        "english": "Andorra",
        "arabic": "أندورا"
      }
    },
    {
      "code": "AO",
      "name": {
        "english": "Angola",
        "arabic": "أنغولا"
      }
    },
    {
      "code": "AI",
      "name": {
        "english": "Anguilla",
        "arabic": "أنغويلا"
      }
    },
    {
      "code": "AQ",
      "name": {
        "english": "Antarctica",
        "arabic": "القارة القطبية الجنوبية"
      }
    },
    {
      "code": "AG",
      "name": {
        "english": "Antigua and Barbuda",
        "arabic": "أنتيغوا وبربودا"
      }
    },
    {
      "code": "AR",
      "name": {
        "english": "Argentina",
        "arabic": "الأرجنتين"
      }
    },
    {
      "code": "AM",
      "name": {
        "english": "Armenia",
        "arabic": "أرمينيا"
      }
    },
    {
      "code": "AW",
      "name": {
        "english": "Aruba",
        "arabic": "أروبا"
      }
    },
    {
      "code": "AU",
      "name": {
        "english": "Australia",
        "arabic": "أستراليا"
      }
    },
    {
      "code": "AT",
      "name": {
        "english": "Austria",
        "arabic": "النمسا"
      }
    },
    {
      "code": "AZ",
      "name": {
        "english": "Azerbaijan",
        "arabic": "أذربيجان"
      }
    },
    {
      "code": "BS",
      "name": {
        "english": "Bahamas",
        "arabic": "الباهاما"
      }
    },
    {
      "code": "BH",
      "name": {
        "english": "Bahrain",
        "arabic": "البحرين"
      }
    },
    {
      "code": "BD",
      "name": {
        "english": "Bangladesh",
        "arabic": "بنغلاديش"
      }
    },
    {
      "code": "BB",
      "name": {
        "english": "Barbados",
        "arabic": "بربادوس"
      }
    },
    {
      "code": "BY",
      "name": {
        "english": "Belarus",
        "arabic": "بيلاروسيا"
      }
    },
    {
      "code": "BE",
      "name": {
        "english": "Belgium",
        "arabic": "بلجيكا"
      }
    },
    {
      "code": "BZ",
      "name": {
        "english": "Belize",
        "arabic": "بليز"
      }
    },
    {
      "code": "BJ",
      "name": {
        "english": "Benin",
        "arabic": "بنين"
      }
    },
    {
      "code": "BM",
      "name": {
        "english": "Bermuda",
        "arabic": "برمودا"
      }
    },
    {
      "code": "BT",
      "name": {
        "english": "Bhutan",
        "arabic": "بوتان"
      }
    },
    {
      "code": "BO",
      "name": {
        "english": "Bolivia (Plurinational State of)",
        "arabic": "بوليفيا"
      }
    },
    {
      "code": "BQ",
      "name": {
        "english": "Bonaire, Sint Eustatius and Saba",
        "arabic": "بونير"
      }
    },
    {
      "code": "BA",
      "name": {
        "english": "Bosnia and Herzegovina",
        "arabic": "البوسنة والهرسك"
      }
    },
    {
      "code": "BW",
      "name": {
        "english": "Botswana",
        "arabic": "بوتسوانا"
      }
    },
    {
      "code": "BV",
      "name": {
        "english": "Bouvet Island",
        "arabic": "جزيرة بوفيه"
      }
    },
    {
      "code": "BR",
      "name": {
        "english": "Brazil",
        "arabic": "البرازيل"
      }
    },
    {
      "code": "IO",
      "name": {
        "english": "British Indian Ocean Territory",
        "arabic": "إقليم المحيط الهندي البريطاني"
      }
    },
    {
      "code": "BN",
      "name": {
        "english": "Brunei Darussalam",
        "arabic": "بروناي"
      }
    },
    {
      "code": "BG",
      "name": {
        "english": "Bulgaria",
        "arabic": "بلغاريا"
      }
    },
    {
      "code": "BF",
      "name": {
        "english": "Burkina Faso",
        "arabic": "بوركينا فاسو"
      }
    },
    {
      "code": "BI",
      "name": {
        "english": "Burundi",
        "arabic": "بوروندي"
      }
    },
    {
      "code": "CV",
      "name": {
        "english": "Cabo Verde",
        "arabic": "الرأس الأخضر"
      }
    },
    {
      "code": "KH",
      "name": {
        "english": "Cambodia",
        "arabic": "كمبوديا"
      }
    },
    {
      "code": "CM",
      "name": {
        "english": "Cameroon",
        "arabic": "الكاميرون"
      }
    },
    {
      "code": "CA",
      "name": {
        "english": "Canada",
        "arabic": "كندا"
      }
    },
    {
      "code": "KY",
      "name": {
        "english": "Cayman Islands",
        "arabic": "جزر كايمان"
      }
    },
    {
      "code": "CF",
      "name": {
        "english": "Central African Republic",
        "arabic": "جمهورية أفريقيا الوسطى"
      }
    },
    {
      "code": "TD",
      "name": {
        "english": "Chad",
        "arabic": "تشاد"
      }
    },
    {
      "code": "CL",
      "name": {
        "english": "Chile",
        "arabic": "تشيلي"
      }
    },
    {
      "code": "CN",
      "name": {
        "english": "China",
        "arabic": "الصين"
      }
    },
    {
      "code": "CX",
      "name": {
        "english": "Christmas Island",
        "arabic": "جزيرة الكريسماس"
      }
    },
    {
      "code": "CC",
      "name": {
        "english": "Cocos (Keeling) Islands",
        "arabic": "جزر كوكوس (كيلينغ)"
      }
    },
    {
      "code": "CO",
      "name": {
        "english": "Colombia",
        "arabic": "كولومبيا"
      }
    },
    {
      "code": "KM",
      "name": {
        "english": "Comoros",
        "arabic": "جزر القمر"
      }
    },
    {
      "code": "CG",
      "name": {
        "english": "Congo",
        "arabic": "الكونغو"
      }
    },
    {
      "code": "CD",
      "name": {
        "english": "Congo (Democratic Republic of the)",
        "arabic": "جمهورية الكونغو الديمقراطية"
      }
    },
    {
      "code": "CK",
      "name": {
        "english": "Cook Islands",
        "arabic": "جزر كوك"
      }
    },
    {
      "code": "CR",
      "name": {
        "english": "Costa Rica",
        "arabic": "كوستاريكا"
      }
    },
    {
      "code": "HR",
      "name": {
        "english": "Croatia",
        "arabic": "كرواتيا"
      }
    },
    {
      "code": "CU",
      "name": {
        "english": "Cuba",
        "arabic": "كوبا"
      }
    },
    {
      "code": "CW",
      "name": {
        "english": "Curaçao",
        "arabic": "كوراساو"
      }
    },
    {
      "code": "CY",
      "name": {
        "english": "Cyprus",
        "arabic": "قبرص"
      }
    },
    {
      "code": "CZ",
      "name": {
        "english": "Czech Republic",
        "arabic": "التشيك"
      }
    },
    {
      "code": "DK",
      "name": {
        "english": "Denmark",
        "arabic": "الدانمرك"
      }
    },
    {
      "code": "DJ",
      "name": {
        "english": "Djibouti",
        "arabic": "جيبوتي"
      }
    },
    {
      "code": "DM",
      "name": {
        "english": "Dominica",
        "arabic": "دومينيكا"
      }
    },
    {
      "code": "DO",
      "name": {
        "english": "Dominican Republic",
        "arabic": "جمهورية الدومينيكان"
      }
    },
    {
      "code": "EC",
      "name": {
        "english": "Ecuador",
        "arabic": "الإكوادور"
      }
    },
    {
      "code": "EG",
      "name": {
        "english": "Egypt",
        "arabic": "مصر"
      }
    },
    {
      "code": "SV",
      "name": {
        "english": "El Salvador",
        "arabic": "السلفادور"
      }
    },
    {
      "code": "GQ",
      "name": {
        "english": "Equatorial Guinea",
        "arabic": "غينيا الاستوائية"
      }
    },
    {
      "code": "ER",
      "name": {
        "english": "Eritrea",
        "arabic": "إريتريا"
      }
    },
    {
      "code": "EE",
      "name": {
        "english": "Estonia",
        "arabic": "إستونيا"
      }
    },
    {
      "code": "ET",
      "name": {
        "english": "Ethiopia",
        "arabic": "إثيوبيا"
      }
    },
    {
      "code": "FK",
      "name": {
        "english": "Falkland Islands (Malvinas)",
        "arabic": "جزر فوكلاند (مالفيناس)"
      }
    },
    {
      "code": "FO",
      "name": {
        "english": "Faroe Islands",
        "arabic": "جزر فارو"
      }
    },
    {
      "code": "FJ",
      "name": {
        "english": "Fiji",
        "arabic": "فيجي"
      }
    },
    {
      "code": "FI",
      "name": {
        "english": "Finland",
        "arabic": "فنلندا"
      }
    },
    {
      "code": "FR",
      "name": {
        "english": "France",
        "arabic": "فرنسا"
      }
    },
    {
      "code": "GF",
      "name": {
        "english": "French Guiana",
        "arabic": "غويانا الفرنسية"
      }
    },
    {
      "code": "PF",
      "name": {
        "english": "French Polynesia",
        "arabic": "بولينيزيا الفرنسية"
      }
    },
    {
      "code": "TF",
      "name": {
        "english": "French Southern Territories",
        "arabic": "المقاطعات الجنوبية الفرنسية"
      }
    },
    {
      "code": "GA",
      "name": {
        "english": "Gabon",
        "arabic": "الغابون"
      }
    },
    {
      "code": "GM",
      "name": {
        "english": "Gambia",
        "arabic": "غامبيا"
      }
    },
    {
      "code": "GE",
      "name": {
        "english": "Georgia",
        "arabic": "جورجيا"
      }
    },
    {
      "code": "DE",
      "name": {
        "english": "Germany",
        "arabic": "ألمانيا"
      }
    },
    {
      "code": "GH",
      "name": {
        "english": "Ghana",
        "arabic": "غانا"
      }
    },
    {
      "code": "GI",
      "name": {
        "english": "Gibraltar",
        "arabic": "جبل طارق"
      }
    },
    {
      "code": "GR",
      "name": {
        "english": "Greece",
        "arabic": "اليونان"
      }
    },
    {
      "code": "GL",
      "name": {
        "english": "Greenland",
        "arabic": "جرينلاند"
      }
    },
    {
      "code": "GD",
      "name": {
        "english": "Grenada",
        "arabic": "غرينادا"
      }
    },
    {
      "code": "GP",
      "name": {
        "english": "Guadeloupe",
        "arabic": "جوادلوب"
      }
    },
    {
      "code": "GU",
      "name": {
        "english": "Guam",
        "arabic": "غوام"
      }
    },
    {
      "code": "GT",
      "name": {
        "english": "Guatemala",
        "arabic": "غواتيمالا"
      }
    },
    {
      "code": "GG",
      "name": {
        "english": "Guernsey",
        "arabic": "غيرنزي"
      }
    },
    {
      "code": "GN",
      "name": {
        "english": "Guinea",
        "arabic": "غينيا"
      }
    },
    {
      "code": "GW",
      "name": {
        "english": "Guinea-Bissau",
        "arabic": "غينيا بيساو"
      }
    },
    {
      "code": "GY",
      "name": {
        "english": "Guyana",
        "arabic": "غيانا"
      }
    },
    {
      "code": "HT",
      "name": {
        "english": "Haiti",
        "arabic": "هايتي"
      }
    },
    {
      "code": "HM",
      "name": {
        "english": "Heard Island and McDonald Islands",
        "arabic": "جزيرة هيرد وجزر ماكدونالد"
      }
    },
    {
      "code": "VA",
      "name": {
        "english": "Holy See",
        "arabic": "الفاتيكان"
      }
    },
    {
      "code": "HN",
      "name": {
        "english": "Honduras",
        "arabic": "هندوراس"
      }
    },
    {
      "code": "HK",
      "name": {
        "english": "Hong Kong",
        "arabic": "هونغ كونغ"
      }
    },
    {
      "code": "HU",
      "name": {
        "english": "Hungary",
        "arabic": "هنغاريا"
      }
    },
    {
      "code": "IS",
      "name": {
        "english": "Iceland",
        "arabic": "آيسلندا"
      }
    },
    {
      "code": "IN",
      "name": {
        "english": "India",
        "arabic": "الهند"
      }
    },
    {
      "code": "ID",
      "name": {
        "english": "Indonesia",
        "arabic": "إندونيسيا"
      }
    },
    {
      "code": "IR",
      "name": {
        "english": "Iran (Islamic Republic of)",
        "arabic": "إيران"
      }
    },
    {
      "code": "IQ",
      "name": {
        "english": "Iraq",
        "arabic": "العراق"
      }
    },
    {
      "code": "IE",
      "name": {
        "english": "Ireland",
        "arabic": "أيرلندا"
      }
    },
    {
      "code": "IM",
      "name": {
        "english": "Isle of Man",
        "arabic": "جزيرة مان"
      }
    },
    {
      "code": "IL",
      "name": {
        "english": "Israel",
        "arabic": "إسرائيل"
      }
    },
    {
      "code": "IT",
      "name": {
        "english": "Italy",
        "arabic": "إيطاليا"
      }
    },
    {
      "code": "JM",
      "name": {
        "english": "Jamaica",
        "arabic": "جامايكا"
      }
    },
    {
      "code": "JP",
      "name": {
        "english": "Japan",
        "arabic": "اليابان"
      }
    },
    {
      "code": "JE",
      "name": {
        "english": "Jersey",
        "arabic": "جيرسي"
      }
    },
    {
      "code": "JO",
      "name": {
        "english": "Jordan",
        "arabic": "الأردن"
      }
    },
    {
      "code": "KZ",
      "name": {
        "english": "Kazakhstan",
        "arabic": "كازاخستان"
      }
    },
    {
      "code": "KE",
      "name": {
        "english": "Kenya",
        "arabic": "كينيا"
      }
    },
    {
      "code": "KI",
      "name": {
        "english": "Kiribati",
        "arabic": "كيريباتي"
      }
    },
    {
      "code": "KP",
      "name": {
        "english": "Korea (Democratic People's Republic of)",
        "arabic": "كوريا الشمالية"
      }
    },
    {
      "code": "KR",
      "name": {
        "english": "Korea (Republic of)",
        "arabic": "كوريا الجنوبية"
      }
    },
    {
      "code": "KW",
      "name": {
        "english": "Kuwait",
        "arabic": "الكويت"
      }
    },
    {
      "code": "KG",
      "name": {
        "english": "Kyrgyzstan",
        "arabic": "قيرغيزستان"
      }
    },
    {
      "code": "LA",
      "name": {
        "english": "Lao People's Democratic Republic",
        "arabic": "لاوس"
      }
    },
    {
      "code": "LV",
      "name": {
        "english": "Latvia",
        "arabic": "لاتفيا"
      }
    },
    {
      "code": "LB",
      "name": {
        "english": "Lebanon",
        "arabic": "لبنان"
      }
    },
    {
      "code": "LS",
      "name": {
        "english": "Lesotho",
        "arabic": "ليسوتو"
      }
    },
    {
      "code": "LR",
      "name": {
        "english": "Liberia",
        "arabic": "ليبيريا"
      }
    },
    {
      "code": "LY",
      "name": {
        "english": "Libya",
        "arabic": "ليبيا"
      }
    },
    {
      "code": "LI",
      "name": {
        "english": "Liechtenstein",
        "arabic": "ليختنشتاين"
      }
    },
    {
      "code": "LT",
      "name": {
        "english": "Lithuania",
        "arabic": "ليتوانيا"
      }
    },
    {
      "code": "LU",
      "name": {
        "english": "Luxembourg",
        "arabic": "لوكسمبورغ"
      }
    },
    {
      "code": "MO",
      "name": {
        "english": "Macao",
        "arabic": "ماكاو"
      }
    },
    {
      "code": "MK",
      "name": {
        "english": "Macedonia (the former Yugoslav Republic of)",
        "arabic": "مقدونيا"
      }
    },
    {
      "code": "MG",
      "name": {
        "english": "Madagascar",
        "arabic": "مدغشقر"
      }
    },
    {
      "code": "MW",
      "name": {
        "english": "Malawi",
        "arabic": "مالاوي"
      }
    },
    {
      "code": "MY",
      "name": {
        "english": "Malaysia",
        "arabic": "ماليزيا"
      }
    },
    {
      "code": "MV",
      "name": {
        "english": "Maldives",
        "arabic": "جزر المالديف"
      }
    },
    {
      "code": "ML",
      "name": {
        "english": "Mali",
        "arabic": "مالي"
      }
    },
    {
      "code": "MT",
      "name": {
        "english": "Malta",
        "arabic": "مالطا"
      }
    },
    {
      "code": "MH",
      "name": {
        "english": "Marshall Islands",
        "arabic": "جزر مارشال"
      }
    },
    {
      "code": "MQ",
      "name": {
        "english": "Martinique",
        "arabic": "مارتينيك"
      }
    },
    {
      "code": "MR",
      "name": {
        "english": "Mauritania",
        "arabic": "موريتانيا"
      }
    },
    {
      "code": "MU",
      "name": {
        "english": "Mauritius",
        "arabic": "موريشيوس"
      }
    },
    {
      "code": "YT",
      "name": {
        "english": "Mayotte",
        "arabic": "مايوت"
      }
    },
    {
      "code": "MX",
      "name": {
        "english": "Mexico",
        "arabic": "المكسيك"
      }
    },
    {
      "code": "FM",
      "name": {
        "english": "Micronesia (Federated States of)",
        "arabic": "ميكرونيزيا"
      }
    },
    {
      "code": "MD",
      "name": {
        "english": "Moldova (Republic of)",
        "arabic": "مولدوفا"
      }
    },
    {
      "code": "MC",
      "name": {
        "english": "Monaco",
        "arabic": "موناكو"
      }
    },
    {
      "code": "MN",
      "name": {
        "english": "Mongolia",
        "arabic": "منغوليا"
      }
    },
    {
      "code": "ME",
      "name": {
        "english": "Montenegro",
        "arabic": "الجبل الأسود"
      }
    },
    {
      "code": "MS",
      "name": {
        "english": "Montserrat",
        "arabic": "مونتسيرات"
      }
    },
    {
      "code": "MA",
      "name": {
        "english": "Morocco",
        "arabic": "المغرب"
      }
    },
    {
      "code": "MZ",
      "name": {
        "english": "Mozambique",
        "arabic": "موزمبيق"
      }
    },
    {
      "code": "MM",
      "name": {
        "english": "Myanmar",
        "arabic": "ميانمار"
      }
    },
    {
      "code": "NA",
      "name": {
        "english": "Namibia",
        "arabic": "ناميبيا"
      }
    },
    {
      "code": "NR",
      "name": {
        "english": "Nauru",
        "arabic": "ناورو"
      }
    },
    {
      "code": "NP",
      "name": {
        "english": "Nepal",
        "arabic": "نيبال"
      }
    },
    {
      "code": "NL",
      "name": {
        "english": "Netherlands",
        "arabic": "هولندا"
      }
    },
    {
      "code": "NC",
      "name": {
        "english": "New Caledonia",
        "arabic": "كاليدونيا الجديدة"
      }
    },
    {
      "code": "NZ",
      "name": {
        "english": "New Zealand",
        "arabic": "نيوزيلندا"
      }
    },
    {
      "code": "NI",
      "name": {
        "english": "Nicaragua",
        "arabic": "نيكاراغوا"
      }
    },
    {
      "code": "NE",
      "name": {
        "english": "Niger",
        "arabic": "النيجر"
      }
    },
    {
      "code": "NG",
      "name": {
        "english": "Nigeria",
        "arabic": "نيجيريا"
      }
    },
    {
      "code": "NU",
      "name": {
        "english": "Niue",
        "arabic": "نيوي"
      }
    },
    {
      "code": "NF",
      "name": {
        "english": "Norfolk Island",
        "arabic": "جزيرة نورفولك"
      }
    },
    {
      "code": "MF",
      "name": {
        "english": "Saint Martin (French part)",
        "arabic": "سانت مارتن (الجزء الفرنسي)"
      }
    },
    {
      "code": "PM",
      "name": {
        "english": "Saint Pierre and Miquelon",
        "arabic": "سان بيير وميكلون"
      }
    },
    {
      "code": "VC",
      "name": {
        "english": "Saint Vincent and the Grenadines",
        "arabic": "سانت فينسنت وجزر غرينادين"
      }
    },
    {
      "code": "WS",
      "name": {
        "english": "Samoa",
        "arabic": "ساموا"
      }
    },
    {
      "code": "SM",
      "name": {
        "english": "San Marino",
        "arabic": "سان مارينو"
      }
    },
    {
      "code": "ST",
      "name": {
        "english": "Sao Tome and Principe",
        "arabic": "ساو تومي وبرينسيبي"
      }
    },
    {
      "code": "SA",
      "name": {
        "english": "Saudi Arabia",
        "arabic": "المملكة العربية السعودية"
      }
    },
    {
      "code": "SN",
      "name": {
        "english": "Senegal",
        "arabic": "السنغال"
      }
    },
    {
      "code": "RS",
      "name": {
        "english": "Serbia",
        "arabic": "صربيا"
      }
    },
    {
      "code": "SC",
      "name": {
        "english": "Seychelles",
        "arabic": "سيشل"
      }
    },
    {
      "code": "SL",
      "name": {
        "english": "Sierra Leone",
        "arabic": "سيراليون"
      }
    },
    {
      "code": "SG",
      "name": {
        "english": "Singapore",
        "arabic": "سنغافورة"
      }
    },
    {
      "code": "SX",
      "name": {
        "english": "Sint Maarten (Dutch part)",
        "arabic": "سانت مارتن (الجزء الهولندي)"
      }
    },
    {
      "code": "SK",
      "name": {
        "english": "Slovakia",
        "arabic": "سلوفاكيا"
      }
    },
    {
      "code": "SI",
      "name": {
        "english": "Slovenia",
        "arabic": "سلوفينيا"
      }
    },
    {
      "code": "SB",
      "name": {
        "english": "Solomon Islands",
        "arabic": "جزر سليمان"
      }
    },
    {
      "code": "SO",
      "name": {
        "english": "Somalia",
        "arabic": "الصومال"
      }
    },
    {
      "code": "ZA",
      "name": {
        "english": "South Africa",
        "arabic": "جنوب أفريقيا"
      }
    },
    {
      "code": "GS",
      "name": {
        "english": "South Georgia and the South Sandwich Islands",
        "arabic": "جورجيا الجنوبية وجزر ساندويتش الجنوبية"
      }
    },
    {
      "code": "SS",
      "name": {
        "english": "South Sudan",
        "arabic": "جنوب السودان"
      }
    },
    {
      "code": "ES",
      "name": {
        "english": "Spain",
        "arabic": "إسبانيا"
      }
    },
    {
      "code": "LK",
      "name": {
        "english": "Sri Lanka",
        "arabic": "سيريلانكا"
      }
    },
    {
      "code": "SD",
      "name": {
        "english": "Sudan",
        "arabic": "السودان"
      }
    },
    {
      "code": "SR",
      "name": {
        "english": "Suriname",
        "arabic": "سورينام"
      }
    },
    {
      "code": "SJ",
      "name": {
        "english": "Svalbard and Jan Mayen",
        "arabic": "سفالبارد ويان ماين"
      }
    },
    {
      "code": "SZ",
      "name": {
        "english": "Swaziland",
        "arabic": "سوازيلاند"
      }
    },
    {
      "code": "SE",
      "name": {
        "english": "Sweden",
        "arabic": "السويد"
      }
    },
    {
      "code": "CH",
      "name": {
        "english": "Switzerland",
        "arabic": "سويسرا"
      }
    },
    {
      "code": "SY",
      "name": {
        "english": "Syrian Arab Republic",
        "arabic": "سوريا"
      }
    },
    {
      "code": "TW",
      "name": {
        "english": "Taiwan",
        "arabic": "تايوان"
      }
    },
    {
      "code": "TJ",
      "name": {
        "english": "Tajikistan",
        "arabic": "طاجيكستان"
      }
    },
    {
      "code": "TZ",
      "name": {
        "english": "Tanzania, United Republic of",
        "arabic": "تنزانيا"
      }
    },
    {
      "code": "TH",
      "name": {
        "english": "Thailand",
        "arabic": "تايلاند"
      }
    },
    {
      "code": "TL",
      "name": {
        "english": "Timor-Leste",
        "arabic": "تيمور الشرقية"
      }
    },
    {
      "code": "TG",
      "name": {
        "english": "Togo",
        "arabic": "توغو"
      }
    },
    {
      "code": "TK",
      "name": {
        "english": "Tokelau",
        "arabic": "توكيلاو"
      }
    },
    {
      "code": "TO",
      "name": {
        "english": "Tonga",
        "arabic": "تونغا"
      }
    },
    {
      "code": "TT",
      "name": {
        "english": "Trinidad and Tobago",
        "arabic": "ترينيداد وتوباغو"
      }
    },
    {
      "code": "TN",
      "name": {
        "english": "Tunisia",
        "arabic": "تونس"
      }
    },
    {
      "code": "TR",
      "name": {
        "english": "Turkey",
        "arabic": "تركيا"
      }
    },
    {
      "code": "TM",
      "name": {
        "english": "Turkmenistan",
        "arabic": "تركمانستان"
      }
    },
    {
      "code": "TC",
      "name": {
        "english": "Turks and Caicos Islands",
        "arabic": "جزر تركس وكايكوس"
      }
    },
    {
      "code": "TV",
      "name": {
        "english": "Tuvalu",
        "arabic": "توفالو"
      }
    },
    {
      "code": "UG",
      "name": {
        "english": "Uganda",
        "arabic": "أوغندا"
      }
    },
    {
      "code": "UA",
      "name": {
        "english": "Ukraine",
        "arabic": "أوكرانيا"
      }
    },
    {
      "code": "AE",
      "name": {
        "english": "United Arab Emirates",
        "arabic": "الإمارات العربية المتحدة"
      }
    },
    {
      "code": "GB",
      "name": {
        "english": "United Kingdom of Great Britain and Northern Ireland",
        "arabic": "المملكة المتحدة"
      }
    },
    {
      "code": "US",
      "name": {
        "english": "United States of America",
        "arabic": "الولايات المتحدة الأمريكية"
      }
    },
    {
      "code": "UY",
      "name": {
        "english": "Uruguay",
        "arabic": "أوروغواي"
      }
    },
    {
      "code": "UZ",
      "name": {
        "english": "Uzbekistan",
        "arabic": "أوزبكستان"
      }
    },
    {
      "code": "VU",
      "name": {
        "english": "Vanuatu",
        "arabic": "فانواتو"
      }
    },
    {
      "code": "VE",
      "name": {
        "english": "Venezuela (Bolivarian Republic of)",
        "arabic": "فنزويلا"
      }
    },
    {
      "code": "VN",
      "name": {
        "english": "Viet Nam",
        "arabic": "فيتنام"
      }
    },
    {
      "code": "WF",
      "name": {
        "english": "Wallis and Futuna",
        "arabic": "واليس وفوتونا"
      }
    },
    {
      "code": "EH",
      "name": {
        "english": "Western Sahara",
        "arabic": "الصحراء الغربية"
      }
    },
    {
      "code": "YE",
      "name": {
        "english": "Yemen",
        "arabic": "اليمن"
      }
    },
    {
      "code": "ZM",
      "name": {
        "english": "Zambia",
        "arabic": "زامبيا"
      }
    },
    {
      "code": "ZW",
      "name": {
        "english": "Zimbabwe",
        "arabic": "زيمبابوي"
      }
    }

  ]

  getAllCountry() {
    return this.countriesWithCodes;
  }




  getAllCountryList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  add(data: any): Observable<any> { // message from vendor or user to admin
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }

  update(data: any): Observable<any> {  // message from  admin to vendor or user 
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  delete(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?Id=${id}` , {});
  }
}
