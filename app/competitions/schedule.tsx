
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface RaceData {
    uuid: string;
    name: string;
    raceNo: string;
    eventName: string;
    round: string;
    roundNo: number;,
    roundCount: number;
    startScheduledTimestamp: number;
    startActualTimestamp: number | null;
    raceState: string;
    isFinal: boolean;
    updatedTimestamp: number;
    createdTimestamp: number;
}

interface CompetitionProps {
    uuid: string;
}

export function Schedule({ uuid }: CompetitionProps) {
    const [races, setRaces] = useState<RaceData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://liveresults-master.local.nz/api/react/10/competitions/${uuid}/schedule`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const envelope: RaceData = await response.json();
                setRaces(envelope.data.races);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching schedule');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [uuid]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-gray-600 dark:text-gray-400">Loading competition...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-4">
                    <Link
                        to="/competitions"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                        ← Back to Competitions
                    </Link>
                </div>
                <div className="flex justify-center items-center p-8">
                    <div className="text-red-600 dark:text-red-400">Error: {error}</div>
                </div>
            </div>
        );
    }

    if (!competition) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-4">
                    <Link
                        to="/competitions"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                        ← Back to Competitions
                    </Link>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-400">
                    Competition not found.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <Link
                    to="/competitions"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                    ← Back to Competitions
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {competition.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                UUID
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                {competition.uuid}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                {competition.status || 'Unknown'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date
                            </label>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                {competition.date || 'TBD'}
                            </p>
                        </div>

                        {competition.location && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Location
                                </label>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {competition.location}
                                </p>
                            </div>
                        )}
                    </div>

                    {competition.description && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                {competition.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}