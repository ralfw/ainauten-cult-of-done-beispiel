# More Sophisticated CLI/Console User Interfaces

For console applications (CLI, TUI), the Cliffy framework should be preferred. The following modules are available:

### Read command-line arguments and start functions
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

### Color representation and cursor control
import { colors, tty } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/mod.ts";

### Parse command-line arguments
import { parseFlags } from "https://deno.land/x/cliffy@v1.0.0-rc.4/flags/mod.ts";

### Respond to individual key presses
import { KeyCode, parse } from "https://deno.land/x/cliffy@v1.0.0-rc.4/keycode/mod.ts";
import { keypress, KeyPressEvent } from "https://deno.land/x/cliffy@v1.0.0-rc.4/keypress/mod.ts";

### Prompt the user for input
import { Confirm, Input, Number, Secret } from "https://deno.land/x/cliffy@v1.0.0-rc.4/prompt/mod.ts";

### Display data in tables
import { Cell, Table } from "https://deno.land/x/cliffy@v1.0.0-rc.4/table/mod.ts";
>>>