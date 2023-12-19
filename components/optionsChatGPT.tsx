interface Options {
    [key: string]: string;
}

const options: Options = {
    'Basándote en mis metas actuales': '¿hay consejos que podrían ayudarme a avanzar?',
    'Analiza mi estado de ánimo': 'y dime el más común',
    'tendencia o patrón': 'que debería tener en cuenta sobre mí mismo?',
    'Menciona mis malos hábitos': 'con la cantidad de veces que se repiten',
};

function OptionsChatGpt({optionSelected}: { optionSelected: (option: string) => void }) {

    const optionGroups = Object.keys(options);
    const leftOptions = optionGroups.slice(0, 2);
    const rightOptions = optionGroups.slice(2);

    return (
        <section
            className='items-stretch mb-6 max-w-full px-9 flex flex-row gap-2 justify-center'>
            <div className='justify-between flex flex-col w-[50%] gap-2'>
                {leftOptions.map((optionGroup, groupIndex) => (
                    <article
                        key={groupIndex}
                        className='
                        animate-bounce-short
                         h-[50%] flex flex-col justify-center  border-[#6C757D] p-[6px] border-[1px] rounded-[10px] max-w-full cursor-pointer bg-[#343A40]'
                        onClick={() => optionSelected(optionGroup + ' ' + options[optionGroup])}
                    >
                        <span className='font-medium'>{optionGroup}</span>
                        <span className='text-[#ADB5BD]'>{options[optionGroup]}</span>
                    </article>
                ))}
            </div>
            <div className='justify-between gap-2 flex flex-col w-[50%]'>
                {rightOptions.map((optionGroup, groupIndex) => (
                    <article
                        key={groupIndex}
                        className='h-[50%] flex flex-col justify-center border-[#6C757D] p-[6px] border-[1px] rounded-[10px] max-w-full cursor-pointer bg-[#343A40]'
                        onClick={() => optionSelected(optionGroup + ' ' + options[optionGroup])}
                    >
                        <span className='font-medium'>{optionGroup}</span>
                        <span className='text-[#ADB5BD]'>{options[optionGroup]}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default OptionsChatGpt;