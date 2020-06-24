import React, { Component } from "react";
import User from "../../interfaces/User.interface";
import SearchState from "../../interfaces/SearchState.interface";
import emptyState from "../../constants/emptyState";

class PokemonSearch extends Component<User, SearchState> {
  constructor(props: User) {
    super(props);
    this.state = emptyState;
  }

  handleChange = (e: any): void => {
    this.setState({
      text: e.target.value.trim(),
    });
  };

  handleSearch = (): void => {
    const { text } = this.state;
    this.setState(emptyState);
    fetch(`https://pokeapi.co/api/v2/pokemon/${text}`)
      .then((res) => res.json())
      .then((character) =>
        this.setState({
          name: character.name,
          numberOfAbilities: character.abilities.length,
          baseExperience: character.base_experience,
          imageUrl: character.sprites.front_default,
          hasError: false,
        })
      )
      .catch(() =>
        this.setState({
          hasError: true,
        })
      );
  };

  showContent = () => {
    const { name, numberOfAbilities, imageUrl, baseExperience } = this.state;
    return (
      <div>
        <img src={imageUrl} alt="pokemon" width={"300px"} />
        <div className={"alert alert-success"} role="alert">
          У {name} {numberOfAbilities} сильных сторон и {baseExperience} скилов
        </div>
      </div>
    );
  };

  showErrorMsg = () => {
    return (
      <div className={"alert alert-danger"} role="alert">
        Покемон не найден, попробуйте еще раз
      </div>
    );
  };

  render() {
    const { name: useName, numberOfPokemons } = this.props;
    const { hasError, text, numberOfAbilities } = this.state;
    return (
      <div className="container">
        <h5>
          В {useName} можно выбрать {numberOfPokemons} покемонов
        </h5>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Введите название покемона (pikachu, snorlax и др.) или номер
              покемона, начиная с 1
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={text}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </form>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSearch}
        >
          Поиск!
        </button>
        {hasError && this.showErrorMsg()}
        {Boolean(numberOfAbilities) && this.showContent()}
      </div>
    );
  }
}

export default PokemonSearch;
