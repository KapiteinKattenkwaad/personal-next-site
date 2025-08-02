type AnalyticsEvent = {
    action: string;
    category?: string;
    label?: string;
    value?: number;
};

export const sendGaEvent = ({
    action,
    category,
    label,
    value,
}: AnalyticsEvent): void => {
    // @ts-ignore
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        // @ts-ignore
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};