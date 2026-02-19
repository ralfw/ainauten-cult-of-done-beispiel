# In-Memory Event Store

The Event Store records events in-memory. Events can subsequently be "played back" in their entirety or filtered.

The entire Event Store can be saved to or loaded from a file. This is intentionally a very coarse-grained persistence and is not suitable for production systems.

The Event Store serves to demonstrate the CCC approach to Event Sourcing. CCC = Command, Query, Consistency. Articles on the topic [here (Ralf Westphal)](https://ralfwestphal.substack.com/s/event-orientation) and [here (Rico Fritzsche)](https://ricofritzsche.me/tag/event-sourcing/).

Literature on the topic of Event Sourcing:

- [Understanding Eventsourcing, Martin Dilger](https://leanpub.com/eventmodeling-and-eventsourcing)
- [Event Sourcing, Greg Young](https://leanpub.com/eventsource)
- [Patterns of Event Sourced Systems, Greg Young](https://leanpub.com/patternsofeventsourcedsystems)

## Import

The Event Store framework can be imported from a GitHub repository as follows:

```typescript
import { MemoryEventStore } from "https://raw.githubusercontent.com/ralfw/ccceventstores/main/src/mod.ts";
```

## Interface

### Interfaces

The framework publishes the following interfaces:

```typescript
export interface Event {
  readonly eventType: string;
  readonly payload: Record<string, unknown>;
}

export interface EventRecord extends Event {
  readonly sequenceNumber: number;
  readonly timestamp: Date;
}

export interface EventFilter {
  readonly eventTypes: string[]; // OR
  // AND
  readonly payloadPredicates?: Record<string, unknown>[]; // OR
}

export interface EventQuery {
  readonly filters: EventFilter[]; // OR
}

export interface QueryResult {
  events: EventRecord[];
  maxSequenceNumber: number;
}

export interface EventStore {
  query(filterCriteria: EventQuery): Promise<QueryResult>;
  query(filterCriteria: EventFilter): Promise<QueryResult>;

  append(events: Event[]): Promise<void>;
  append(events: Event[], filterCriteria: EventQuery, expectedMaxSequenceNumber: number): Promise<void>;
  append(events: Event[], filterCriteria: EventFilter, expectedMaxSequenceNumber: number): Promise<void>;
  
  subscribe(handle: HandleEvents): Promise<EventSubscription>;
}

// Import types from the event stream for subscription functionality
export type HandleEvents = (events: EventRecord[]) => Promise<void>;

export interface EventSubscription {
  readonly id: string;
  unsubscribe(): Promise<void>;
}

export interface Subscription {
  id: string;
  handle: HandleEvents;
}

export interface EventStreamNotifier {
  subscribe(handle: HandleEvents): Promise<EventSubscription>;
  notify(events: EventRecord[]): Promise<void>;
  close(): Promise<void>;
}
```

### Class

```typescript
export class MemoryEventStore implements EventStore {
    // Methods of the EventStore interface and also:

    constructor(writeThruFilename?: string) {...}

    async storeToFile(filename: string): Promise<void> {...}

    static async createFromFile(filename: string, 
                                ignoreMissingFile: boolean = false, 
                                writeThruMode: boolean = false): Promise<MemoryEventStore> {...}
}
```

## Usage Example

```typescript
import { MemoryEventStore, createFilter, createQuery } from "https://raw.githubusercontent.com/ralfw/ccceventstores/main/src/mod.ts";

// Instantiate Event Store with write-thru, i.e., all changes are immediately written to the file.
const es = await MemoryEventStore.createFromFile("events.json", true, true)
const es2 = new MemoryEventStore("events2.json"); // Create Event Store with write-thru
const es3 = new MemoryEventStore(); // Event Store without automatic persistence

// Recording an event. Every event has an eventType and a type-specific payload.
// If a payload is specified in a filter, events of all types in the filter must contain this payload.
await es.append([{eventType:"e1", payload:{message:"hello"}}])
await es.append([{eventType:"e2", payload:{amount:99}}])

// Querying events with a filter. 
// Event types can be passed to a filter like this:
const context = await es.query(createFilter(["e1"]));

// A filter can also take the payload into account:
const context2 = await es.query(createFilter(["e1"], [{message:"hello"}]));

// Complex filters can be formulated as a Query.
// The filters within a Query are internally linked with OR.
const query = createQuery(createFilter(["e1"]), createFilter(["e2"]));
const context3 = await es.query(query);

// Conditional append: An append can also be performed with a Query.
// In this case, the events are only recorded if the Event Store
// has remained unchanged since the previous execution of the query:
await es.append([{eventType:"e1", payload:{message:"hello"}}], query, context3.maxSequenceNumber);

es3.storeToFile("events3.json"); // Save events explicitly/manually
```