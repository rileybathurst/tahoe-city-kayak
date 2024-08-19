import * as Sentry from "@sentry/gatsby";

// ! Im getting production errors in development mode
Sentry.init({
  dsn: "https://e83f15c7f9964364b1d07883140a8776@o4504981237465088.ingest.sentry.io/4505041781850112",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})


// 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