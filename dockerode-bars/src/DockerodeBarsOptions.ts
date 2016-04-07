interface ListQueryParameters {
  all?: boolean;
  limit?: number;
  since?: string;
  before?: string;
  size?: boolean;
  filters?: { [key: string]: string[] };
}

interface EventFilters {
    // -- container to filter
    container?: string[];
    // -- event to filter
    event?: string[];
    // -- image to filter
    image?: string[];
    // -- image and container label to filter
    label?: string[],
    // -- either container or image or volume or network
    type?: ("container" | "image" | "volume" | "network")[];
    // -- volume to filter
    volume?: string[];
    // -- network to filter
    network?: string[];
}


interface DockerodeBarsOptions {
  dockerHost: {};
  template: string;
  listOptions?: ListQueryParameters;
  watch: boolean;
  watchFilter: EventFilters;
  outputPath: string;
  container: string;
  helpers?: {[name: string]: Function};
}