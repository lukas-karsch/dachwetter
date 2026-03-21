import { getWeather } from "@/app/getWeather";
import ShareButton from "@/components/ShareButton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WeatherCard } from "@/components/WeatherCard";
import React from "react";
import { extractDachwetter } from "@/lib/helper/extractDachwetter";
import DachwetterHeading from "@/components/DachwetterHeading";
import Time from "@/components/Time";
import { getOwnUrl } from "@/lib/helper/origin";

export const dynamic = "force-dynamic"; // SSR

export default async function HomeScreen() {
	// TODO change location?
	const weather = await getWeather("Stuttgart");
	if (!weather) {
		throw new Error();
	}
	const dachwetter = extractDachwetter(weather);

	const nextDachwetter = dachwetter.findIndex(
		(dachwetter) => dachwetter.isDachwetter,
	);

	const rainMessage =
		nextDachwetter === -1
			? `Heute ${dachwetter[0].rain}`
			: `${dachwetter[nextDachwetter].rain} vorhergesagt`;
	const windMessage =
		nextDachwetter === -1
			? `Heute ${dachwetter[0].wind}`
			: `${dachwetter[nextDachwetter].wind} vorhergesagt`;

	return (
		<main className="min-h-screen px-4 py-16 md:p-24 flex flex-col justify-center">
			<div className="container">
				<div className="flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-end">
					<DachwetterHeading nextDachwetter={nextDachwetter} />
					{nextDachwetter >= 0 && (
						<ShareButton
							degrees={dachwetter[nextDachwetter].degrees}
							nextDachwetter={nextDachwetter}
							url={getOwnUrl()}
						/>
					)}
				</div>
				<div className="mt-4 rounded-2xl p-8 bg-accent space-y-8 border shadow">
					<div className="flex gap-4 lg:gap-32 flex-wrap justify-between">
						<p className="text-lg">
							Sonnenuntergang um{" "}
							<Time time={weather.city.sunset} />
						</p>
						<p className="text-lg">{windMessage}</p>
						<p className="text-lg">{rainMessage}</p>
					</div>
					<ScrollArea>
						<div className="flex gap-8 mb-4">
							{dachwetter.map((wetter) => {
								return (
									<WeatherCard
										key={wetter.plusDays}
										dachwetter={wetter.isDachwetter}
										feelsLike={wetter.degrees}
										icon={wetter.icon}
										plusDays={wetter.plusDays}
									/>
								);
							})}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
			<div className="text-zinc-300 text-center text-sm mt-4">
				Aktualisiert: {new Date().toLocaleDateString()},{" "}
				{new Date().toLocaleTimeString()}
			</div>
		</main>
	);
}
