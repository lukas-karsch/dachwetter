import React from "react";

export default function DachwetterHeading({nextDachwetter}: { nextDachwetter: number }) {
    if (nextDachwetter < 0) {
        return <h1 className="text-4xl font-semibold">
            Es ist <span className="font-bold text-blue-300">kein Dachwetter</span> <br />
            in Sicht 😞
        </h1>
    } else if (nextDachwetter === 0) {
        return (
            <h1 className="text-4xl font-semibold">
                Heute ist <br/>
                <span className="font-black text-primary text-5xl">Dachwetter!</span>
            </h1>
        );
    }
    return (
        <h1 className="text-4xl font-semibold">
            In {nextDachwetter} Tagen ist<br/>
            <span className="font-black text-primary text-5xl">Dachwetter!</span>
        </h1>
    );
}
