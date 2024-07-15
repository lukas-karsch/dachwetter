/**
 * @param averageWind in m/s
 */
export function formatWind(averageWind: number): string {
    if(averageWind < 0.5) {
        return "Windstill";
    } else if(averageWind < 1.5) {
        return "Schwacher Wind";
    } else if(averageWind < 2.5) {
        return "Mäßiger Wind"
    } else return "Starker Wind";
}

/**
 * @param totalRain in mm
 */
export function formatRain(totalRain: number): string {
    if (totalRain === 0) {
        return "Kein Regen";
    }
    if(totalRain < 2) {
        return "Leichter Regen";
    } else return "Regen";
}
