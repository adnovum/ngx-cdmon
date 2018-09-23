import { Injectable, NgZone } from '@angular/core';

import { DurationTimer } from './duration-timer';

const desiredInterval = 1000;
const warningThreshold = 30;

/** Used to measure how much of each second is spent in change detection */
@Injectable()
export class IntervalTimer extends DurationTimer {
	private intervalHandle: number;
	private intervalStart: number;
	private overhead: number;

	constructor(private zone: NgZone) {
		super();
	}

	startup() {
		this.overhead = 0;
		this.intervalHandle = this.zone.runOutsideAngular(() =>
			setInterval(this.onInterval.bind(this), desiredInterval)
		);
		this.intervalStart = performance.now();
	}

	shutdown() {
		clearInterval(this.intervalHandle);
	}

	report(duration: number) {
		this.overhead += duration;
	}

	protected onInterval(): void {
		// Report current interval
		if (this.overhead > 0) {
			const intervalEnd = performance.now();
			const actualInterval = intervalEnd - this.intervalStart;
			const wastage = (this.overhead / actualInterval) * 100;
			if (wastage > warningThreshold) {
				console.warn(`${wastage}% of time spent on change detection.`);
			}
		}

		// Start new interval
		this.overhead = 0;
		this.intervalStart = performance.now();
	}
}
