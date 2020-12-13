import config from '../../../../../../config';
import { TrackingConfig, TrackingProvider } from './TrackingConfig';

export function getTrackingConfig(): TrackingConfig {
  switch (config.repoFactory.storageRepoName) {
    case TrackingProvider.NewRelic: return {
      trackingProvider: TrackingProvider.NewRelic,
    };
    default: case TrackingProvider.Fake: return {
      trackingProvider: TrackingProvider.Fake,
    };
  }
}
