import { Injectable } from '@angular/core';

import { TickReporter } from './tick-reporter';

declare const Zone: any;

function report(duration: number): void {
	const task = Zone.currentTask;
	if (duration > 66.6) {
		console.error(`cdmon is ENRAGED! 15FPS threshold broken (took ${duration} ms). Caused by:`, task);
	}
	else if (duration > 33.3) {
		console.warn(`cdmon is disgruntled. 30FPS threshold broken (took ${duration} ms). Caused by:`, task);
	}
	else if (duration > 16.6) {
		console.info(`cdmon is miffed... 60FPS threshold broken (took ${duration} ms). Caused by:`, task);
	}
	else {
		console.info('cdmon ticked.');
	}
}

@Injectable()
export class TickTimer implements TickReporter {
	private start = 0;

	startup() {
		console.log('cdmon is now watching you tick.');
	}

	shutdown() {
		console.log('cdmon is now sleeping.');
	}

	beforeTick() {
		this.start = performance.now();
	}

	afterTick() {
		const end = performance.now();
		const duration = end - this.start;
		report(duration);
	}
}
