import { select, call, put, takeEvery } from '@redux-saga/core/effects'
import { selectUserId, getUserSuccess } from './store'
import { getUserFromApi } from './api'

function* getUserSaga() {
  const userId = yield select(selectUserId)
  const user = yield call(getUserFromApi, userId)
  console.log('User:', user)
  yield put(getUserSuccess(user))
}

export function* rootSaga() {
  yield takeEvery('getUser', getUserSaga)
}
