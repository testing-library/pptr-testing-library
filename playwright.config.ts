import {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
  reporter: 'list',
  testDir: 'test/fixture',
}

export default config
