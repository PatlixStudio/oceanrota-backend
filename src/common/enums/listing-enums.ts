export enum ListingVisibility {
  STANDARD = 'STANDARD',
  FEATURED = 'FEATURED',
}

export enum FeaturedPlan {
  FEATURED_7 = 'FEATURED_7',
  FEATURED_14 = 'FEATURED_14',
  FEATURED_30 = 'FEATURED_30',
  FEATURED_60 = 'FEATURED_60',
  FEATURED_90 = 'FEATURED_90',
  FEATURED_120 = 'FEATURED_120',
  FEATURED_180 = 'FEATURED_180',
  FEATURED_210 = 'FEATURED_210', // 6 months
  FEATURED_365 = 'FEATURED_365', // 1 year
}

export const FeaturedPlanDurationDays = {
  FEATURED_7: 7,
  FEATURED_14: 14,
  FEATURED_30: 30,
  FEATURED_60: 60,
  FEATURED_90: 90,
  FEATURED_120: 120,
  FEATURED_180: 180,
  FEATURED_210: 210,   // 6 months
  FEATURED_365: 365,   // 1 year
};

export const FeaturedPlanPrices = {
  FEATURED_7: 35,      // $5/day
  FEATURED_14: 60,     // $4.3/day
  FEATURED_30: 88,     // $2.9/day
  FEATURED_60: 160,    // $2.7/day
  FEATURED_90: 240,    // $2.7/day
  FEATURED_120: 310,   // $2.6/day
  FEATURED_180: 450,   // $2.5/day
  FEATURED_210: 520,   // ~$2.48/day
  FEATURED_365: 850,   // ~$2.33/day — best value
};

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export enum ListingPurpose {
  ALL = 'ALL',
  RENT = 'RENT',
  SELL = 'SALE'
}