import { Injectable } from '@angular/core';

import { TickReporter } from './tick-reporter';

/** Base class for measuring tick duration, delegating further work to the report() abstract method. */
@Injectable()
export abstract class DurationTimer extends TickReporter {
	private start = 0;

	beforeTick() {
		this.start = performance.now();
	}

	afterTick() {
		const end = performance.now();
		const duration = end - this.start;
		this.report(duration);
	}

	abstract report(duration: number);
}
