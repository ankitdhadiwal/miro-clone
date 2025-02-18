"use client";

import { useOrganization } from "@clerk/nextjs";
import {useSearchParams} from "next/navigation";
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";

// interface DashboardPageProps {
//     searchParams: {
//         search?: string;
//         favourites?: string;
//     };
// };

// const DashboardPage = ({ searchParams }: DashboardPageProps) => {
//     const {organization} = useOrganization();

//     return (
//         <div className="flex-1 h-[calc(100%-80px)] p-6">
//             {!organization ? (
//                  <EmptyOrg />
//             ) : (
//                 <BoardList orgId= {organization.id} query={searchParams} />
//             )}
           
//         </div>
//     );
// }


const DashboardPage = () => {
    const {organization} = useOrganization();
    const searchParams = useSearchParams();

    const query = {
        search: searchParams.get("search") || undefined,
        favourites: searchParams.get("favourites") || undefined,
    };

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={query} />}
        </div>

    )
}

export default DashboardPage;