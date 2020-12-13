import { unlink } from 'fs-extra';
import getStorageDir from '../../utils/getStorageDir';
import { DeleteActivityProfileContentOptions } from './deleteActivityProfileContent';
import { LocalFileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';

export async function deleteActivityProfileContentFromFS(
  config: LocalFileStorageConfig,
  opts: DeleteActivityProfileContentOptions,
): Promise<void> {
  const profileDir = getStorageDir({
    subfolder: config.localStorageDir,
    lrs_id: opts.lrs_id,
  });
  const filePath = `${profileDir}/${opts.key}`;
  await unlink(filePath);
}
