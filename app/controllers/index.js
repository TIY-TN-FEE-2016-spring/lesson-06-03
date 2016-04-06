import Ember from 'ember';

export default Ember.Controller.extend({
  saveNewRecipe() {
    const attributes = {
      method: this.method,
      grind: this.grind,
      coffeeWeight: this.coffeeWeight,
      waterWeight: this.waterWeight,
      rating: this.rating,
    };

    fetch(`https://tiny-tn.herokuapp.com/collections/coffee`, {
        method: `POST`,
        headers: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(attributes),
      }).then((res) => res.json())
      .then((recipe) => {
        // Clear our recipe form
        this.clearForm();
        // Add new recipe to existing list
        this.addRecipe(recipe);
      });
  },

  deleteRecipe(recipe) {
    // Tell the server to delete
    fetch(`https://tiny-tn.herokuapp.com/collections/coffee/${recipe._id}`, {
      method: `Delete`,
    }).then((res) => res.json())
    .then((data) => {
      // Update our list
      this.removeRecipe(recipe);
    });
  },

  startEditing(recipe) {
    this.set(`editing`, true);
  },

  clearForm() {
    this.set(`method`, ``);
    this.set(`grind`, ``);
    this.set(`coffeeWeight`, ``);
    this.set(`waterWeight`, ``);
    this.set(`rating`, ``);
  },

  addRecipe(recipe) {
    this.set(`model`, [recipe, ...this.model]);
  },

  removeRecipe(recipe) {
    this.set(`model`, this.model.filter((curr) => {
      return curr !== recipe;
    }));
  }
});
