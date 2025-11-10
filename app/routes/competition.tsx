import { Competition } from "~/competitions/competition";
import {useParams} from "react-router";

export default function CompetitionRoute() {
    const { uuid } = useParams<{ uuid: string }>();

    if (!uuid) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-red-600 dark:text-red-400">
                    Error: Competition UUID is required
                </div>
            </div>
        );
    }

    return <Competition uuid={uuid} />;
}