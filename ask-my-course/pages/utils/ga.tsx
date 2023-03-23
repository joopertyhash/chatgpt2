export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_MANAGER_ID ?? '';

// STRONGLY TYPED!
// https://dev.to/asross311/strongly-typed-google-analytics-v4-with-nextjs-4g13

// https://javascript.plainenglish.io/add-segment-google-analytics-to-your-typescript-next-js-app-af9fc7cd83a9
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

export const pageview = (url: URL) => {
    // @ts-ignore
    if (window.gtag) {
        // @ts-ignore
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url
        });
    } else {
        console.log("Warning: window.gtag not available.")
    }
};

type EventNames =
    | 'click_file'
    | 'click_translation'
    | 'click_transliteration'
    | 'create_file'
    | 'click_log_in'
    | 'signup'
    ;

type GTagEvent = {
    action: EventNames;
    category: string;
    label: string;
    value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    // @ts-ignore
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value
    });
};

