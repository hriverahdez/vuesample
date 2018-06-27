// vue-i18n import
import {i18n} from '@/config/i18n'

const state = {
  networksInfo: {
    '1001': {
      'name': 'Mobusi',
      'params_by_network': {
        'api_key': {
          'label': i18n.t('networks_info.mobusi1001.api_key.label'),
          'help_text': i18n.t('networks_info.mobusi1001.api_key.help_text')
        },
        'user_id': {
          'label': i18n.t('networks_info.mobusi1001.user_id.label'),
          'help_text': i18n.t('networks_info.mobusi1001.user_id.help_text')
        }
      }
    },
    '1002': {
      'name': 'Admob',
      'params_by_network': {
        'publisher_id': {
          'label': i18n.t('networks_info.admob1002.publisher_id.label'),
          'help_text': i18n.t('networks_info.admob1002.publisher_id.help_text')
        }
      }
    },
    '1003': {
      'name': 'Adcolony',
      'params_by_network': {
        'api_key': {
          'label': i18n.t('networks_info.adcolony1003.api_key.label'),
          'help_text': i18n.t('networks_info.adcolony1003.api_key.help_text')
        }
      },
      'format_profile_text': {
        'appId': i18n.t('networks_info.adcolony1003.format_profile_text.appId')
      }
    },
    '1004': {
      'name': 'Unityads',
      'params_by_network': {
        'api_key': {
          'label': i18n.t('networks_info.unityads1004.api_key.label'),
          'help_text': i18n.t('networks_info.unityads1004.api_key.help_text')
        }
      }
    },
    '1005': {
      'name': 'Vungle',
      'params_by_network': {
        'api_key': {
          'label': i18n.t('networks_info.vungle1005.api_key.label'),
          'help_text': i18n.t('networks_info.vungle1005.api_key.help_text')
        }
      }
    },
    '1007': {
      'name': 'Chartboost',
      'params_by_network': {
        'user_id': {
          'label': i18n.t('networks_info.chartboost1007.user_id.label'),
          'help_text': i18n.t('networks_info.chartboost1007.user_id.help_text')
        },
        'user_signature': {
          'label': i18n.t('networks_info.chartboost1007.user_signature.label'),
          'help_text': i18n.t('networks_info.chartboost1007.user_signature.help_text')
        }
      }
    },
    '1008': {
      'name': 'Applovin',
      'params_by_network': {
        'report_key': {
          'label': i18n.t('networks_info.applovin1008.report_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.report_key.help_text')
        },
        'sdk_key': {
          'label': i18n.t('networks_info.applovin1008.sdk_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.sdk_key.help_text')
        }
      }
    },
    '1009': {
      'name': 'Facebook',
      'params_by_network': {
        'access_token': {
          'label': i18n.t('networks_info.applovin1008.report_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.report_key.help_text')
        },
        'app_id': {
          'label': i18n.t('networks_info.applovin1008.sdk_key.label'),
          'help_text': i18n.t('networks_info.applovin1008.sdk_key.help_text')
        }
      }
    },
    '1012': {
      'name': 'Inmobi',
      'params_by_network': {
        'acountId': {
          'label': i18n.t('networks_info.inmobi1012.account_id.label'),
          'help_text': i18n.t('networks_info.inmobi1012.account_id.help_text')
        },
        'apiKey': {
          'label': i18n.t('networks_info.inmobi1012.api_key.label'),
          'help_text': i18n.t('networks_info.inmobi1012.api_key.help_text')
        },
        'username': {
          'label': i18n.t('networks_info.inmobi1012.username.label'),
          'help_text': i18n.t('networks_info.inmobi1012.username.help_text')
        },
        'password': {
          'label': i18n.t('networks_info.inmobi1012.password.label'),
          'help_text': i18n.t('networks_info.inmobi1012.password.help_text')
        }
      }
    },
    '1013': {
      'name': 'Startapp',
      'params_by_network': {
        'acountId': {
          'label': i18n.t('networks_info.startapp1013.account_id.label'),
          'help_text': i18n.t('networks_info.startapp1013.account_id.help_text')
        },
        'token': {
          'label': i18n.t('networks_info.startapp1013.token.label'),
          'help_text': i18n.t('networks_info.startapp1013.token.help_text')
        }
      }
    },
    '1014': {
      'name': 'Mobvista',
      'params_by_network': {
        'skey': {
          'label': i18n.t('networks_info.mobvista1014.skey.label'),
          'help_text': i18n.t('networks_info.mobvista1014.skey.help_text')
        },
        'secret': {
          'label': i18n.t('networks_info.mobvista1014.secret.label'),
          'help_text': i18n.t('networks_info.mobvista1014.secret.help_text')
        }
      }
    },
    '1015': {
      'name': 'Hyprmx',
      'params_by_network': {
        'help_text': i18n.t('networks_info.hyprmx1015.help_text')
      }
    },
    '1016': {
      'name': 'Mopub',
      'params_by_network': {
        'apiKey': {
          'label': i18n.t('networks_info.mopub1016.api_key.label'),
          'help_text': i18n.t('networks_info.mopub1016.api_key.help_text')
        },
        'inventoryReport': {
          'label': i18n.t('networks_info.mopub1016.inventory_report.label'),
          'help_text': i18n.t('networks_info.mopub1016.inventory_report.help_text')
        },
        'campaignReport': {
          'label': i18n.t('networks_info.mopub1016.campaign_report.label'),
          'help_text': i18n.t('networks_info.mopub1016.campaign_report.help_text')
        }
      }
    },
    '1017': {
      'name': 'Ironsource',
      'params_by_network': {
        'username': {
          'label': i18n.t('networks_info.ironsource1017.username.label'),
          'help_text': i18n.t('networks_info.ironsource1017.username.help_text')
        },
        'secret_key': {
          'label': i18n.t('networks_info.ironsource1017.secret_key.label'),
          'help_text': i18n.t('networks_info.ironsource1017.secret_key.help_text')
        }
      }
    }
  },
  'countries': [
    {
      'name': 'Afghanistan',
      'code': 'AF'
    },
    {
      'name': 'African Regional Industrial Property Organization',
      'code': 'AP'
    },
    {
      'name': 'Albania',
      'code': 'AL'
    },
    {
      'name': 'Algeria',
      'code': 'DZ'
    },
    {
      'name': 'American Samoa',
      'code': 'AS'
    },
    {
      'name': 'Andorra',
      'code': 'AD'
    },
    {
      'name': 'Angola',
      'code': 'AO'
    },
    {
      'name': 'Anguilla',
      'code': 'AI'
    },
    {
      'name': 'Antarctica',
      'code': 'AQ'
    },
    {
      'name': 'Antigua & Barbuda',
      'code': 'AG'
    },
    {
      'name': 'Argentina',
      'code': 'AR'
    },
    {
      'name': 'Armenia',
      'code': 'AM'
    },
    {
      'name': 'Aruba',
      'code': 'AW'
    },
    {
      'name': 'Ascension Island',
      'code': 'AC'
    },
    {
      'name': 'Australia',
      'code': 'AU'
    },
    {
      'name': 'Austria',
      'code': 'AT'
    },
    {
      'name': 'Azerbaijan',
      'code': 'AZ'
    },
    {
      'name': 'Bahamas',
      'code': 'BS'
    },
    {
      'name': 'Bahrain',
      'code': 'BH'
    },
    {
      'name': 'Bangladesh',
      'code': 'BD'
    },
    {
      'name': 'Barbados',
      'code': 'BB'
    },
    {
      'name': 'Belarus',
      'code': 'BY'
    },
    {
      'name': 'Belgium',
      'code': 'BE'
    },
    {
      'name': 'Belize',
      'code': 'BZ'
    },
    {
      'name': 'Benin',
      'code': 'BJ'
    },
    {
      'name': 'Bermuda',
      'code': 'BM'
    },
    {
      'name': 'Bhutan',
      'code': 'BT'
    },
    {
      'name': 'Bolivia',
      'code': 'BO'
    },
    {
      'name': 'Bosnia & Herzegovina',
      'code': 'BA'
    },
    {
      'name': 'Botswana',
      'code': 'BW'
    },
    {
      'name': 'Bouvet Island',
      'code': 'BV'
    },
    {
      'name': 'Brazil',
      'code': 'BR'
    },
    {
      'name': 'British Indian Ocean Territory',
      'code': 'IO'
    },
    {
      'name': 'British Virgin Islands',
      'code': 'VG'
    },
    {
      'name': 'Brunei',
      'code': 'BN'
    },
    {
      'name': 'Bulgaria',
      'code': 'BG'
    },
    {
      'name': 'Burkina Faso',
      'code': 'BF'
    },
    {
      'name': 'Burundi',
      'code': 'BI'
    },
    {
      'name': 'Cambodia',
      'code': 'KH'
    },
    {
      'name': 'Cameroon',
      'code': 'CM'
    },
    {
      'name': 'Canada',
      'code': 'CA'
    },
    {
      'name': 'Canary Islands',
      'code': 'IC'
    },
    {
      'name': 'Cape Verde',
      'code': 'CV'
    },
    {
      'name': 'Caribbean Netherlands',
      'code': 'BQ'
    },
    {
      'name': 'Cayman Islands',
      'code': 'KY'
    },
    {
      'name': 'Central African Republic',
      'code': 'CF'
    },
    {
      'name': 'Ceuta & Melilla',
      'code': 'EA'
    },
    {
      'name': 'Chad',
      'code': 'TD'
    },
    {
      'name': 'Chile',
      'code': 'CL'
    },
    {
      'name': 'China',
      'code': 'CN'
    },
    {
      'name': 'Christmas Island',
      'code': 'CX'
    },
    {
      'name': 'Cocos (Keeling) Islands',
      'code': 'CC'
    },
    {
      'name': 'Colombia',
      'code': 'CO'
    },
    {
      'name': 'Comoros',
      'code': 'KM'
    },
    {
      'name': 'Congo - Brazzaville',
      'code': 'CG'
    },
    {
      'name': 'Congo - Kinshasa',
      'code': 'CD'
    },
    {
      'name': 'Cook Islands',
      'code': 'CK'
    },
    {
      'name': 'Costa Rica',
      'code': 'CR'
    },
    {
      'name': 'Croatia',
      'code': 'HR'
    },
    {
      'name': 'Cuba',
      'code': 'CU'
    },
    {
      'name': 'Curaçao',
      'code': 'CW'
    },
    {
      'name': 'Cyprus',
      'code': 'CY'
    },
    {
      'name': 'Czechia',
      'code': 'CZ'
    },
    {
      'name': 'Côte d’Ivoire',
      'code': 'CI'
    },
    {
      'name': 'Denmark',
      'code': 'DK'
    },
    {
      'name': 'Diego Garcia',
      'code': 'DG'
    },
    {
      'name': 'Djibouti',
      'code': 'DJ'
    },
    {
      'name': 'Dominica',
      'code': 'DM'
    },
    {
      'name': 'Dominican Republic',
      'code': 'DO'
    },
    {
      'name': 'Ecuador',
      'code': 'EC'
    },
    {
      'name': 'Egypt',
      'code': 'EG'
    },
    {
      'name': 'El Salvador',
      'code': 'SV'
    },
    {
      'name': 'Equatorial Guinea',
      'code': 'GQ'
    },
    {
      'name': 'Eritrea',
      'code': 'ER'
    },
    {
      'name': 'Estonia',
      'code': 'EE'
    },
    {
      'name': 'Ethiopia',
      'code': 'ET'
    },
    {
      'name': 'European Union',
      'code': 'EU'
    },
    {
      'name': 'Eurozone',
      'code': 'EZ'
    },
    {
      'name': 'Falkland Islands',
      'code': 'FK'
    },
    {
      'name': 'Faroe Islands',
      'code': 'FO'
    },
    {
      'name': 'Fiji',
      'code': 'FJ'
    },
    {
      'name': 'Finland',
      'code': 'FI'
    },
    {
      'name': 'France',
      'code': 'FR'
    },
    {
      'name': 'France, Metropolitan',
      'code': 'FX'
    },
    {
      'name': 'French Guiana',
      'code': 'GF'
    },
    {
      'name': 'French Polynesia',
      'code': 'PF'
    },
    {
      'name': 'French Southern Territories',
      'code': 'TF'
    },
    {
      'name': 'Gabon',
      'code': 'GA'
    },
    {
      'name': 'Gambia',
      'code': 'GM'
    },
    {
      'name': 'Georgia',
      'code': 'GE'
    },
    {
      'name': 'Germany',
      'code': 'DE'
    },
    {
      'name': 'Ghana',
      'code': 'GH'
    },
    {
      'name': 'Gibraltar',
      'code': 'GI'
    },
    {
      'name': 'Greece',
      'code': 'GR'
    },
    {
      'name': 'Greenland',
      'code': 'GL'
    },
    {
      'name': 'Grenada',
      'code': 'GD'
    },
    {
      'name': 'Guadeloupe',
      'code': 'GP'
    },
    {
      'name': 'Guam',
      'code': 'GU'
    },
    {
      'name': 'Guatemala',
      'code': 'GT'
    },
    {
      'name': 'Guernsey',
      'code': 'GG'
    },
    {
      'name': 'Guinea',
      'code': 'GN'
    },
    {
      'name': 'Guinea-Bissau',
      'code': 'GW'
    },
    {
      'name': 'Guyana',
      'code': 'GY'
    },
    {
      'name': 'Haiti',
      'code': 'HT'
    },
    {
      'name': 'Honduras',
      'code': 'HN'
    },
    {
      'name': 'Hong Kong SAR China',
      'code': 'HK'
    },
    {
      'name': 'Hungary',
      'code': 'HU'
    },
    {
      'name': 'Iceland',
      'code': 'IS'
    },
    {
      'name': 'India',
      'code': 'IN'
    },
    {
      'name': 'Indonesia',
      'code': 'ID'
    },
    {
      'name': 'Iran',
      'code': 'IR'
    },
    {
      'name': 'Iraq',
      'code': 'IQ'
    },
    {
      'name': 'Ireland',
      'code': 'IE'
    },
    {
      'name': 'Isle of Man',
      'code': 'IM'
    },
    {
      'name': 'Israel',
      'code': 'IL'
    },
    {
      'name': 'Italy',
      'code': 'IT'
    },
    {
      'name': 'Jamaica',
      'code': 'JM'
    },
    {
      'name': 'Japan',
      'code': 'JP'
    },
    {
      'name': 'Jersey',
      'code': 'JE'
    },
    {
      'name': 'Jordan',
      'code': 'JO'
    },
    {
      'name': 'Kazakhstan',
      'code': 'KZ'
    },
    {
      'name': 'Kenya',
      'code': 'KE'
    },
    {
      'name': 'Kiribati',
      'code': 'KI'
    },
    {
      'name': 'Kosovo',
      'code': 'XK'
    },
    {
      'name': 'Kuwait',
      'code': 'KW'
    },
    {
      'name': 'Kyrgyzstan',
      'code': 'KG'
    },
    {
      'name': 'Laos',
      'code': 'LA'
    },
    {
      'name': 'Latvia',
      'code': 'LV'
    },
    {
      'name': 'Lebanon',
      'code': 'LB'
    },
    {
      'name': 'Lesotho',
      'code': 'LS'
    },
    {
      'name': 'Liberia',
      'code': 'LR'
    },
    {
      'name': 'Libya',
      'code': 'LY'
    },
    {
      'name': 'Liechtenstein',
      'code': 'LI'
    },
    {
      'name': 'Lithuania',
      'code': 'LT'
    },
    {
      'name': 'Luxembourg',
      'code': 'LU'
    },
    {
      'name': 'Macau SAR China',
      'code': 'MO'
    },
    {
      'name': 'Macedonia',
      'code': 'MK'
    },
    {
      'name': 'Madagascar',
      'code': 'MG'
    },
    {
      'name': 'Malawi',
      'code': 'MW'
    },
    {
      'name': 'Malaysia',
      'code': 'MY'
    },
    {
      'name': 'Maldives',
      'code': 'MV'
    },
    {
      'name': 'Mali',
      'code': 'ML'
    },
    {
      'name': 'Malta',
      'code': 'MT'
    },
    {
      'name': 'Marshall Islands',
      'code': 'MH'
    },
    {
      'name': 'Martinique',
      'code': 'MQ'
    },
    {
      'name': 'Mauritania',
      'code': 'MR'
    },
    {
      'name': 'Mauritius',
      'code': 'MU'
    },
    {
      'name': 'Mayotte',
      'code': 'YT'
    },
    {
      'name': 'Mexico',
      'code': 'MX'
    },
    {
      'name': 'Micronesia',
      'code': 'FM'
    },
    {
      'name': 'Moldova',
      'code': 'MD'
    },
    {
      'name': 'Monaco',
      'code': 'MC'
    },
    {
      'name': 'Mongolia',
      'code': 'MN'
    },
    {
      'name': 'Montenegro',
      'code': 'ME'
    },
    {
      'name': 'Montserrat',
      'code': 'MS'
    },
    {
      'name': 'Morocco',
      'code': 'MA'
    },
    {
      'name': 'Mozambique',
      'code': 'MZ'
    },
    {
      'name': 'Myanmar (Burma)',
      'code': 'MM'
    },
    {
      'name': 'Namibia',
      'code': 'NA'
    },
    {
      'name': 'Nauru',
      'code': 'NR'
    },
    {
      'name': 'Nepal',
      'code': 'NP'
    },
    {
      'name': 'Netherlands',
      'code': 'NL'
    },
    {
      'name': 'Netherlands Antilles',
      'code': 'AN'
    },
    {
      'name': 'New Caledonia',
      'code': 'NC'
    },
    {
      'name': 'New Zealand',
      'code': 'NZ'
    },
    {
      'name': 'Nicaragua',
      'code': 'NI'
    },
    {
      'name': 'Niger',
      'code': 'NE'
    },
    {
      'name': 'Nigeria',
      'code': 'NG'
    },
    {
      'name': 'Niue',
      'code': 'NU'
    },
    {
      'name': 'Norfolk Island',
      'code': 'NF'
    },
    {
      'name': 'North Korea',
      'code': 'KP'
    },
    {
      'name': 'Northern Mariana Islands',
      'code': 'MP'
    },
    {
      'name': 'Norway',
      'code': 'NO'
    },
    {
      'name': 'Oman',
      'code': 'OM'
    },
    {
      'name': 'Pakistan',
      'code': 'PK'
    },
    {
      'name': 'Palau',
      'code': 'PW'
    },
    {
      'name': 'Palestinian Territories',
      'code': 'PS'
    },
    {
      'name': 'Panama',
      'code': 'PA'
    },
    {
      'name': 'Papua New Guinea',
      'code': 'PG'
    },
    {
      'name': 'Paraguay',
      'code': 'PY'
    },
    {
      'name': 'Peru',
      'code': 'PE'
    },
    {
      'name': 'Philippines',
      'code': 'PH'
    },
    {
      'name': 'Pitcairn Islands',
      'code': 'PN'
    },
    {
      'name': 'Poland',
      'code': 'PL'
    },
    {
      'name': 'Portugal',
      'code': 'PT'
    },
    {
      'name': 'Puerto Rico',
      'code': 'PR'
    },
    {
      'name': 'Qatar',
      'code': 'QA'
    },
    {
      'name': 'Romania',
      'code': 'RO'
    },
    {
      'name': 'Russia',
      'code': 'RU'
    },
    {
      'name': 'Rwanda',
      'code': 'RW'
    },
    {
      'name': 'Réunion',
      'code': 'RE'
    },
    {
      'name': 'Samoa',
      'code': 'WS'
    },
    {
      'name': 'San Marino',
      'code': 'SM'
    },
    {
      'name': 'Saudi Arabia',
      'code': 'SA'
    },
    {
      'name': 'Senegal',
      'code': 'SN'
    },
    {
      'name': 'Serbia',
      'code': 'RS'
    },
    {
      'name': 'Seychelles',
      'code': 'SC'
    },
    {
      'name': 'Sierra Leone',
      'code': 'SL'
    },
    {
      'name': 'Singapore',
      'code': 'SG'
    },
    {
      'name': 'Sint Maarten',
      'code': 'SX'
    },
    {
      'name': 'Slovakia',
      'code': 'SK'
    },
    {
      'name': 'Slovenia',
      'code': 'SI'
    },
    {
      'name': 'Solomon Islands',
      'code': 'SB'
    },
    {
      'name': 'Somalia',
      'code': 'SO'
    },
    {
      'name': 'South Africa',
      'code': 'ZA'
    },
    {
      'name': 'South Georgia & South Sandwich Islands',
      'code': 'GS'
    },
    {
      'name': 'South Korea',
      'code': 'KR'
    },
    {
      'name': 'South Sudan',
      'code': 'SS'
    },
    {
      'name': 'Spain',
      'code': 'ES'
    },
    {
      'name': 'Sri Lanka',
      'code': 'LK'
    },
    {
      'name': 'St. Barthélemy',
      'code': 'BL'
    },
    {
      'name': 'St. Helena',
      'code': 'SH'
    },
    {
      'name': 'St. Kitts & Nevis',
      'code': 'KN'
    },
    {
      'name': 'St. Lucia',
      'code': 'LC'
    },
    {
      'name': 'St. Martin',
      'code': 'MF'
    },
    {
      'name': 'St. Pierre & Miquelon',
      'code': 'PM'
    },
    {
      'name': 'St. Vincent & Grenadines',
      'code': 'VC'
    },
    {
      'name': 'Sudan',
      'code': 'SD'
    },
    {
      'name': 'Suriname',
      'code': 'SR'
    },
    {
      'name': 'Svalbard & Jan Mayen',
      'code': 'SJ'
    },
    {
      'name': 'Swaziland',
      'code': 'SZ'
    },
    {
      'name': 'Sweden',
      'code': 'SE'
    },
    {
      'name': 'Switzerland',
      'code': 'CH'
    },
    {
      'name': 'Syria',
      'code': 'SY'
    },
    {
      'name': 'São Tomé & Príncipe',
      'code': 'ST'
    },
    {
      'name': 'Taiwan',
      'code': 'TW'
    },
    {
      'name': 'Tajikistan',
      'code': 'TJ'
    },
    {
      'name': 'Tanzania',
      'code': 'TZ'
    },
    {
      'name': 'Thailand',
      'code': 'TH'
    },
    {
      'name': 'Timor-Leste',
      'code': 'TL'
    },
    {
      'name': 'Togo',
      'code': 'TG'
    },
    {
      'name': 'Tokelau',
      'code': 'TK'
    },
    {
      'name': 'Tonga',
      'code': 'TO'
    },
    {
      'name': 'Trinidad & Tobago',
      'code': 'TT'
    },
    {
      'name': 'Tristan da Cunha',
      'code': 'TA'
    },
    {
      'name': 'Tunisia',
      'code': 'TN'
    },
    {
      'name': 'Turkey',
      'code': 'TR'
    },
    {
      'name': 'Turkmenistan',
      'code': 'TM'
    },
    {
      'name': 'Turks & Caicos Islands',
      'code': 'TC'
    },
    {
      'name': 'Tuvalu',
      'code': 'TV'
    },
    {
      'name': 'U.S. Outlying Islands',
      'code': 'UM'
    },
    {
      'name': 'U.S. Virgin Islands',
      'code': 'VI'
    },
    {
      'name': 'Uganda',
      'code': 'UG'
    },
    {
      'name': 'Ukraine',
      'code': 'UA'
    },
    {
      'name': 'United Arab Emirates',
      'code': 'AE'
    },
    {
      'name': 'United Kingdom',
      'code': 'UK'
    },
    {
      'name': 'United Kingdom',
      'code': 'GB'
    },
    {
      'name': 'United Nations',
      'code': 'UN'
    },
    {
      'name': 'United States',
      'code': 'US'
    },
    {
      'name': 'Uruguay',
      'code': 'UY'
    },
    {
      'name': 'Uzbekistan',
      'code': 'UZ'
    },
    {
      'name': 'Vanuatu',
      'code': 'VU'
    },
    {
      'name': 'Vatican City',
      'code': 'VA'
    },
    {
      'name': 'Venezuela',
      'code': 'VE'
    },
    {
      'name': 'Vietnam',
      'code': 'VN'
    },
    {
      'name': 'Wallis & Futuna',
      'code': 'WF'
    },
    {
      'name': 'Western Sahara',
      'code': 'EH'
    },
    {
      'name': 'World Wide',
      'code': 'XX'
    },
    {
      'name': 'Yemen',
      'code': 'YE'
    },
    {
      'name': 'Zambia',
      'code': 'ZM'
    },
    {
      'name': 'Zimbabwe',
      'code': 'ZW'
    },
    {
      'name': 'Åland Islands',
      'code': 'AX'
    }
  ],
  countriesFormatted: {},
  formats: {
    'banner': i18n.t('formats.banner'),
    'interstitial': i18n.t('formats.interstitial'),
    'rewarded_video': i18n.t('formats.rewarded_video'),
    'banner_premium': i18n.t('formats.banner_premium'),
    'interstitial_premium': i18n.t('formats.interstitial_premium'),
    'rewarded_video_premium': i18n.t('formats.rewarded_video_premium')
  },
  formatsIdsAndNames: [
    {id: 'banner', name: i18n.t('formats.banner')},
    {id: 'interstitial', name: i18n.t('formats.interstitial')},
    {id: 'rewarded_video', name: i18n.t('formats.rewarded_video')},
    {id: 'banner_premium', name: i18n.t('formats.banner_premium')},
    {id: 'interstitial_premium', name: i18n.t('formats.interstitial_premium')},
    {id: 'rewarded_video_premium', name: i18n.t('formats.rewarded_video_premium')}
  ],
  networks: {
    '1001': 'MOBUSI',
    '1002': 'ADMOB',
    '1003': 'ADCOLONY',
    '1004': 'UNITYADS',
    '1005': 'VUNGLE',
    '1006': 'KIIP',
    '1007': 'CHARTBOOST',
    '1008': 'APPLOVIN',
    '1009': 'FACEBOOK',
    '1010': 'MOBUSI_SSP',
    '1012': 'INMOBI',
    '1013': 'STARTAPP',
    '1014': 'MOBVISTA',
    '1015': 'HYPRMX',
    '1016': 'MOPUB',
    '1017': 'IRONSOURCE'
  },
  networksIdsAndNames: [
    {id: '1003', name: 'ADCOLONY'},
    {id: '1002', name: 'ADMOB'},
    {id: '1008', name: 'APPLOVIN'},
    {id: '1007', name: 'CHARTBOOST'},
    {id: '1009', name: 'FACEBOOK'},
    {id: '1015', name: 'HYPRMX'},
    {id: '1012', name: 'INMOBI'},
    {id: '1017', name: 'IRONSOURCE'},
    {id: '1001', name: 'MOBUSI'},
    {id: '1014', name: 'MOBVISTA'},
    {id: '1016', name: 'MOPUB'},
    {id: '1004', name: 'UNITYADS'},
    {id: '1013', name: 'STARTAPP'},
    {id: '1005', name: 'VUNGLE'}
  ],
  urlLogin: 'http://stage.do.linkitox.com/api/token'
}

const getters = {
  countriesFormattedGetter (state, getters) {
    if (getters.countriesGetter) {
      getters.countriesGetter.map((item) => {
        state.countriesFormatted[item.code] = item.name
      })
      return state.countriesFormatted
    }
  },
  countriesGetter (state) {
    return state.countries
  },
  formatsGetter (state) {
    return state.formats
  },
  formatsArrayForDashboardFiltersGetter (state) {
    let formatsArray = []
    if (state.formats) {
      for (let i in state.formats) {
        let obj = {}
        obj['value'] = i
        obj['text'] = state.formats[i]
        formatsArray.push(obj)
      }
    }
    return formatsArray
  },
  formatsIdsAndNamesGetter (state) {
    return state.formatsIdsAndNames
  },
  networksKeysGetter (state) {
    return state.networks
  },
  networksInfoGetter (state) {
    return state.networksInfo
  },
  networksIdsAndNamesGetter (state) {
    return state.networksIdsAndNames
  },
  urlLogin (state) {
    return state.urlLogin
  }
}

export default {
  state,
  getters
}
