export const createStore = reducer => ({
  // State, initialisé avec le reducer.
  _state: reducer(undefined, 'redux-init'),

  // Liste des subscribers, qui seront appelés à chaque
  // mise à jour du state.
  _subscribers: [],

  // Méthode permettant de récupérer le state courant.
  getState() {
    return this._state
  },

  // Méthode permettant d’ajouter un subscriber.
  subscribe(subscriber) {
    this._subscribers.push(subscriber)
  },

  // Méthode permettant de dispatcher une action.
  dispatch(action) {
    // On met à jour le state en appelant le reducer.
    this._state = reducer(this._state, action)

    // On appelle chaque subscriber.
    this._subscribers.forEach(subscriber => {
      subscriber()
    })
  }
})
