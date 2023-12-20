import GenerateChats from "@components/generateChats";

function Page() {
    return (
        <div
            className='h-full lg:scrollbar-none lg:max-w-[50%] flex flex-col w-full gap-3 overflow-hidden overflow-y-auto relative'>
            <GenerateChats/>
        </div>
    )
}

export default Page;