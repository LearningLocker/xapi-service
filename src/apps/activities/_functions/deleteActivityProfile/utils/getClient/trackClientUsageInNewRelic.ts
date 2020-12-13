import { TrackingOptions } from './trackClientUsage';

export async function trackInNewRelic(opts: TrackingOptions) {
  const newrelic = await import('newrelic');
  newrelic.addCustomAttribute('org_id', opts.organisationId);
  newrelic.addCustomAttribute('lrs_id', opts.lrsId);
  newrelic.addCustomAttribute('client_id', opts.clientId);
}
