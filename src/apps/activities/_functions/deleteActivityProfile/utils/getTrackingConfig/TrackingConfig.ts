export enum TrackingProvider {
  NewRelic = 'newrelic',
  Fake = 'fake',
}

export interface NewRelicTrackingConfig {
  readonly trackingProvider: TrackingProvider.NewRelic;
}

export interface FakeTrackingConfig {
  readonly trackingProvider: TrackingProvider.Fake;
}

export type TrackingConfig = (NewRelicTrackingConfig | FakeTrackingConfig);
