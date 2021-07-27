# This repo has been archived. Appreciate later work on fork version. Thanks!
# ngx-cdmon
A simple utility library for monitoring Angular change detection performance.

# Usage

Add the package to your application:

```
npm install ngx-cdmon
```

Add CDMon as a provider, and register whichever TICK_REPORTERS you want to use.

```typescript
import { CDMon, TickTimer, TICK_REPORTERS } from 'ngx-cdmon';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    CDMon,
    { provide: TICK_REPORTERS, multi: true, useClass: TickTimer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

Inject the CDMon service afterwards to enable/disable it.

```typescript
import { CDMon } from 'ngx-cdmon';

@Component({ /*... */ })
export class AppComponent {
  constructor(cdmon: CDMon) {
    cdmon.enable();
  }
}

```

# Custom reporters

Extend the TickReporter class, overriding its methods to hook into the change detection process.
See the existing reporters for an example.
