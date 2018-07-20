import { InjectionToken } from '@angular/core';

/** Interface used to register a reporter. */
export class TickReporter {
	/** Called when reporting is enabled. */
	startup(): void {}
	/** Called when reporting is disabled. */
	shutdown(): void {}
	/** Called before each {@link ApplicationRef.tick} invocation. */
	beforeTick(): void {}
	/** Called after each {@link ApplicationRef.tick} invocation. */
	afterTick(): void {}
}

export const TICK_REPORTERS = new InjectionToken<TickReporter[]>('cdmon tick reporters');
