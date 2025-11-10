import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { formatTimestampShort } from '~/utils/date-formatter';

interface Competition {
    uuid: string;
    name: string;
    venue: string;
    startTimestamp: number;
    finishTimestamp: number | null;
    urlLivestream: string | null;
    isRankings: number;
    isMedalTally: number;
    isPointsTally: number;
    isShowStatus: number;
    updatedTimestamp: number;
    createdTimestamp: number;
}

export function Competitions() {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://liveresults-master.local.nz/api/react/10/competitions?offset=0&limit=10');

                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const envelope: Competition[] = await response.json();
                setCompetitions(envelope.data.competitions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching competitions');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-gray-600 dark:text-gray-400">Loading competitions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-red-600 dark:text-red-400">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Competitions
            </h1>

            {competitions.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    No competitions found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {competitions.map((competition) => (
                            <tr key={competition.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {competition.name}<br />
                                    {competition.venue}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    { formatTimestampShort(competition.startTimestamp) }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {competition.status || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {competition.uuid ? (
                                        <Link
                                            to={`/competitions/${competition.uuid}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                        >
                                            View Details
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400">No UUID</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}