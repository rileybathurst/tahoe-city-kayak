import * as Sentry from "@sentry/gatsby";


Sentry.init({
  dsn: "https://e83f15c7f9964364b1d07883140a8776@o4504981237465088.ingest.sentry.io/4505041781850112",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
