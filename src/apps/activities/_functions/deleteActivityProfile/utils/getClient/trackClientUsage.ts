import { TrackingConfig, TrackingProvider } from '../getTrackingConfig/TrackingConfig';
import { trackInNewRelic } from './trackClientUsageInNewRelic';

export interface TrackingOptions {
  readonly organisationId: string;
  readonly lrsId: string;
  readonly clientId: string;
}

export async function track(config: TrackingConfig, opts: TrackingOptions): Promise<void> {
  switch (config.trackingProvider) {
    case TrackingProvider.NewRelic:
      return trackInNewRelic(opts);
    default:
    case TrackingProvider.Fake: {
      return;
    }
  }
}
