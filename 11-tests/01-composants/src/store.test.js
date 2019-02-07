import { expectSaga } from 'redux-saga-test-plan'
import { rootSaga, reducer, actions, selectors } from './store'
import { select, call } from '@redux-saga/core/effects'
import * as api from './api'

describe('Store', () => {
  it('should dispatch getContactSuccess if contact was fetched', async () => {
    const { storeState } = await expectSaga(rootSaga)
      .withReducer(reducer)
      .provide([
        [call(api.getContact, 2), Promise.resolve({ name: 'Jane Doe' })],
      ])
      .select(selectors.selectContactId)
      .call(api.getContact, 2)
      .put(actions.getContactSuccess({ name: 'Jane Doe' }))
      .dispatch(actions.getContact())
      .run()
    expect(selectors.selectLoading(storeState)).toEqual(false)
    expect(selectors.selectError(storeState)).toEqual(false)
    expect(selectors.selectContact(storeState)).toEqual({ name: 'Jane Doe' })
  })

  it('should dispatch getContactFailure if an error happened', async () => {
    const { storeState } = await expectSaga(rootSaga)
      .withReducer(reducer)
      .provide([[call(api.getContact, 2), Promise.reject('some error')]])
      .select(selectors.selectContactId)
      .call(api.getContact, 2)
      .put(actions.getContactFailure('some error'))
      .dispatch(actions.getContact())
      .run()
    expect(selectors.selectLoading(storeState)).toEqual(false)
    expect(selectors.selectError(storeState)).toEqual(true)
    expect(selectors.selectContact(storeState)).toEqual(null)
  })
})
