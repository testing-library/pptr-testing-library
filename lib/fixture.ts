import type {PlaywrightTestArgs, TestFixture} from '@playwright/test'
import type {IScopedQueryUtils as Queries} from './typedefs'
import {getDocument, getQueriesForElement} from '.'

interface TestingLibraryFixtures {
  queries: Queries
}

const fixture: TestFixture<Queries, PlaywrightTestArgs> = async ({page}, use) => {
  const document = await getDocument(page)

  const queries = getQueriesForElement(document)

  await use(queries)
}

const fixtures = {queries: fixture}

export {fixture, fixtures}
export type {Queries, TestingLibraryFixtures}
