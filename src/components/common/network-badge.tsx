import {CURRENT_NETWORK} from "@/lib/constants.ts";

export function NetworkBadge() {
    return (
        <div
            className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            {CURRENT_NETWORK.toUpperCase()}
        </div>
    );
}