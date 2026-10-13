export const siteUrl = 'https://yakin-cevrem.vercel.app'

export const app = {
  name: 'Yakın Çevrem',
  version: '6.32.0',
  packageId: 'com.ferivonus.yakincevrem',
  playStoreUrl: '',
  supportEmail: 'destek@yakincevrem.app',
  minimumAge: 16,
} as const

// Erken katılım listesi: Vercel ortam değişkenleri. Boşsa form yerine e-posta bağlantısı görünür.
export const waitlistApi = {
  url: (import.meta.env._SUPABASE_URL ?? '').replace(/\/+$/, ''),
  key: import.meta.env._SUPABASE_PUBLISHABLE_KEY ?? '',
} as const

export const legalInfo = {
  version: 1,
  updatedOn: '2026-10-06',
} as const
