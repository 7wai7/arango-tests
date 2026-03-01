export function timeAgo(date: string | Date): string {
    const now = new Date();
    const postDate = typeof date === "string" ? new Date(date) : date;

    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const amount = Math.floor(seconds / value);
        if (amount >= 1) {
            const plural =
                unit === "minute" && amount > 1 ? "minutes" :
                    unit === "hour" && amount > 1 ? "hours" :
                        unit === "second" && amount > 1 ? "seconds" :
                            unit === "day" && amount > 1 ? "days" :
                                unit === "month" && amount > 1 ? "months" :
                                    unit === "year" && amount > 1 ? "years" :
                                        unit;

            return `${amount} ${plural} ago`;
        }
    }

    return "now";
}