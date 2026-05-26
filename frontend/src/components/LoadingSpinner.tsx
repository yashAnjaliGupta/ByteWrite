export function LoadingSpinner() {

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-white/70
                backdrop-blur-sm
            "
        >

            <div className="relative h-24 w-24">

                {/* Outer Spinner */}
                <div
                    className="
                        absolute
                        inset-0
                        animate-spin
                        rounded-full
                        border-[6px]
                        border-gray-300
                        border-t-black
                    "
                />
            </div>

        </div>
    )
}