# Programming in TypeScript for the Deno Runtime

When generating code in TypeScript, it should be optimized for the Deno runtime.

## User Interface

If not requested otherwise, implement user interfaction using the command line and the console.

Use Deno args to get at parameter on the command line.

Use `Console.Log()` etc. to output messages to the user.

Use the `prompt()` function for simple user input.  
A prompt and a default value can also be passed to it.

## Environment Variables

Use Deno means to access settings in `.env`.

## Accessing Local Files

Basic file functions are available directly in Deno. Here is a list of the most important ones:

```
Deno.readFileSync
Deno.readTextFileSync

Deno.writeFileSync
Deno.writeTextFileSync

Deno.writeFileSync with append option
Deno.writeTextFileSync with append option

Deno.removeSync

Deno.renameSync
Deno.copyFileSync

Deno.readDirSync
```

## Dates

When it comes to calculating dates or handling time, the moment.js library should be used. This makes it very easy to add and subtract dates and times. The import for this in Deno looks like this:

```
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
```

## Automated Tests

For tests, the template is very simple:

```
import {assertEquals} from "https://deno.land/std@0.97.0/testing/asserts.ts";

Deno.test("", () => {
  // Test logic
});
```