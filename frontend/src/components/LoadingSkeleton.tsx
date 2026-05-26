export function LoadingSkeleton() {

    return (

        <div className="animate-pulse">

            {/* Navbar */}
            <div
                className="
                    border-b
                    border-gray-200
                    bg-white
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-18
                        max-w-7xl
                        items-center
                        justify-between
                        px-6
                    "
                >

                    {/* Logo */}
                    <div
                        className="
                            h-8
                            w-40
                            rounded-lg
                            bg-gray-200
                        "
                    />

                    {/* Right Buttons */}
                    <div className="flex items-center gap-4">

                        <div
                            className="
                                h-10
                                w-28
                                rounded-full
                                bg-gray-200
                            "
                        />

                        <div
                            className="
                                h-12
                                w-12
                                rounded-full
                                bg-gray-300
                            "
                        />

                    </div>

                </div>
            </div>

            {/* Blog List */}
            <div
                className="
                    mx-auto
                    max-w-4xl
                    px-4
                    py-10
                "
            >

                {
                    Array.from({ length: 5 }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                border-b
                                border-gray-200
                                py-8
                            "
                        >

                            {/* Author Row */}
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        h-10
                                        w-10
                                        rounded-full
                                        bg-gray-300
                                    "
                                />

                                <div
                                    className="
                                        h-4
                                        w-32
                                        rounded
                                        bg-gray-300
                                    "
                                />

                                <div
                                    className="
                                        h-4
                                        w-24
                                        rounded
                                        bg-gray-200
                                    "
                                />

                            </div>

                            {/* Title */}
                            <div
                                className="
                                    mt-5
                                    h-8
                                    w-3/4
                                    rounded-lg
                                    bg-gray-300
                                "
                            />

                            {/* Content Lines */}
                            <div className="mt-5 space-y-3">

                                <div
                                    className="
                                        h-4
                                        w-full
                                        rounded
                                        bg-gray-200
                                    "
                                />

                                <div
                                    className="
                                        h-4
                                        w-[92%]
                                        rounded
                                        bg-gray-200
                                    "
                                />

                                <div
                                    className="
                                        h-4
                                        w-[70%]
                                        rounded
                                        bg-gray-200
                                    "
                                />

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}