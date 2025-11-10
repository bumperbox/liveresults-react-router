export const parseTimestamp = (timestamp: number | string | undefined): Date | null => {
    if (!timestamp) return null;

    let date: Date;

    if (typeof timestamp === 'string') {
        // Handle ISO string or other string formats
        date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
        // Handle Unix timestamp (check if it's in seconds or milliseconds)
        if (timestamp.toString().length === 10) {
            // Unix timestamp in seconds
            date = new Date(timestamp * 1000);
        } else {
            // Unix timestamp in milliseconds
            date = new Date(timestamp);
        }
    } else {
        return null;
    }

    // Check if the date is valid
    return isNaN(date.getTime()) ? null : date;
};

export const formatTimestamp = (timestamp: number | string | undefined): string => {
    const ts = parseTimestamp(timestamp);
    if (!ts) return 'TBD';

    const date = new Date(ts);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};

export const formatTimestampShort = (timestamp: number | string | undefined): string => {
    const ts = parseTimestamp(timestamp);
    if (!ts) return 'TBD';

    const date = new Date(ts);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatTimestampRelative = (timestamp: number | string | undefined): string => {
    const ts = parseTimestamp(timestamp);
    if (!ts) return 'TBD';

    const date = new Date(ts);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    if (diffInSeconds > 0) {
        // Future date
        const days = Math.floor(diffInSeconds / 86400);
        const hours = Math.floor((diffInSeconds % 86400) / 3600);

        if (days > 0) {
            return `In ${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `In ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            return 'Starting soon';
        }
    } else {
        // Past date
        const daysPast = Math.floor(Math.abs(diffInSeconds) / 86400);
        if (daysPast > 0) {
            return `${daysPast} day${daysPast > 1 ? 's' : ''} ago`;
        } else {
            return 'Today';
        }
    }
};