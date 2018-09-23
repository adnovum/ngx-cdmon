import { Injectable } from '@angular/core';

import { DurationTimer } from './duration-timer';

declare const Zone: any;

@Injectable()
export class TickTimer extends DurationTimer {
	startup() {
		console.log('cdmon is now watching you tick.');
	}

	shutdown() {
		console.log('cdmon is now sleeping.');
	}

	report(duration) {
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
}
